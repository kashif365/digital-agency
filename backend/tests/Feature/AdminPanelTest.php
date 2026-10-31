<?php

namespace Tests\Feature;

use App\Enums\LeadStatus;
use App\Filament\Pages\ManageSettings;
use App\Filament\Resources\Leads\Pages\ListLeads;
use App\Filament\Resources\Leads\Pages\ViewLead;
use App\Filament\Widgets\LeadStatusChart;
use App\Filament\Widgets\RecentInquiries;
use App\Filament\Widgets\StatsOverview;
use App\Models\BlogPost;
use App\Models\Industry;
use App\Models\Lead;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\User;
use App\Models\WebsiteSetting;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');
        config(['agency.seed.admin_email' => 'root@example.com', 'agency.seed.admin_password' => 'a-long-test-password']);
        $this->seed(DatabaseSeeder::class);
        $this->admin = User::where('email', 'root@example.com')->sole();
    }

    private function lead(): Lead
    {
        return Lead::create([
            'full_name' => 'Sam Rivera',
            'business_name' => 'Rivera Plumbing',
            'email' => 'sam@example.com',
            'phone' => '5550102030',
            'message' => 'We want more inquiries.',
            'fingerprint' => 'abc',
        ]);
    }

    public function test_guests_are_sent_to_the_login_page(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_a_user_without_a_role_cannot_enter_the_panel(): void
    {
        $this->actingAs(User::factory()->create())->get('/admin')->assertForbidden();
    }

    public function test_every_admin_screen_renders(): void
    {
        $lead = $this->lead();
        $this->actingAs($this->admin);

        $urls = [
            '/admin', '/admin/settings', '/admin/leads', "/admin/leads/{$lead->id}", '/admin/contact-submissions',
            '/admin/services', '/admin/services/create', '/admin/services/'.Service::first()->id.'/edit',
            '/admin/service-categories', '/admin/industries', '/admin/industries/create',
            '/admin/industries/'.Industry::first()->id.'/edit', '/admin/pages', '/admin/pages/create',
            '/admin/pages/'.Page::where('slug', 'home')->first()->id.'/edit', '/admin/portfolios', '/admin/portfolios/create',
            '/admin/portfolios/'.Portfolio::first()->id.'/edit', '/admin/testimonials', '/admin/faqs', '/admin/blog-posts',
            '/admin/blog-posts/create', '/admin/blog-posts/'.BlogPost::first()->id.'/edit', '/admin/blog-categories',
            '/admin/media', '/admin/redirects', '/admin/users',
        ];

        foreach ($urls as $url) {
            $this->get($url)->assertOk();
        }
    }

    /** Widgets load lazily, so rendering the dashboard page does not exercise them. */
    public function test_dashboard_widgets_show_live_figures(): void
    {
        $this->lead();
        $this->actingAs($this->admin);

        Livewire::test(StatsOverview::class)
            ->assertSee('Total leads')
            ->assertSee('Published pages')
            ->assertSee('Active services');
        Livewire::test(LeadStatusChart::class)->assertOk();
        Livewire::test(RecentInquiries::class)->assertSee('Rivera Plumbing');
    }

    public function test_lead_figures_stay_hidden_from_roles_without_lead_access(): void
    {
        $this->actingAs(User::factory()->create()->assignRole('editor'));

        Livewire::test(StatsOverview::class)->assertDontSee('Total leads')->assertSee('Active services');
        $this->assertFalse(RecentInquiries::canView());
        $this->assertFalse(LeadStatusChart::canView());
    }

    public function test_roles_control_which_modules_a_user_can_open(): void
    {
        $editor = User::factory()->create()->assignRole('editor');
        $sales = User::factory()->create()->assignRole('sales');

        $this->actingAs($editor);
        $this->get('/admin/services')->assertOk();
        $this->get('/admin/leads')->assertForbidden();
        $this->get('/admin/settings')->assertForbidden();
        $this->get('/admin/users')->assertForbidden();

        $this->actingAs($sales);
        $this->get('/admin/leads')->assertOk();
        $this->get('/admin/services')->assertForbidden();
    }

    public function test_an_admin_cannot_manage_a_super_admin(): void
    {
        $admin = User::factory()->create()->assignRole('admin');

        $this->assertFalse($admin->can('update', $this->admin));
        $this->assertFalse($admin->can('delete', $this->admin));
    }

    public function test_settings_can_be_saved_and_private_values_stay_private(): void
    {
        $this->actingAs($this->admin);

        Livewire::test(ManageSettings::class)
            ->fillForm([
                'company.name' => 'Northwind Marketing',
                'notifications.lead_email' => 'leads@northwind.example',
                'forms.budget_ranges' => [['label' => 'Flexible']],
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertSame('Northwind Marketing', WebsiteSetting::value('company.name'));
        $this->assertSame(['Flexible'], WebsiteSetting::value('forms.budget_ranges'));

        $this->getJson('/api/v1/settings/public')
            ->assertJsonPath('data.company.name', 'Northwind Marketing')
            ->assertDontSee('leads@northwind.example');
    }

    public function test_the_lead_screen_can_change_status(): void
    {
        $lead = $this->lead();
        $this->actingAs($this->admin);

        Livewire::test(ViewLead::class, ['record' => $lead->getRouteKey()])
            ->callAction('changeStatus', ['status' => LeadStatus::Contacted->value])
            ->assertHasNoActionErrors();

        $this->assertSame(LeadStatus::Contacted, $lead->fresh()->status);
        $this->assertDatabaseHas('lead_notes', ['lead_id' => $lead->id, 'user_id' => $this->admin->id, 'type' => 'status_change']);
    }

    public function test_leads_can_be_exported_from_the_panel(): void
    {
        $this->lead();
        $this->actingAs($this->admin);

        Livewire::test(ListLeads::class)
            ->callAction('export')
            ->assertFileDownloaded('leads-'.now()->format('Y-m-d').'.csv');
    }

    public function test_only_lead_roles_can_export(): void
    {
        $this->actingAs(User::factory()->create()->assignRole('sales'));

        Livewire::test(ListLeads::class)->assertActionVisible('export');

        $this->actingAs(User::factory()->create()->assignRole('editor'));

        $this->assertFalse(auth()->user()->can('export', Lead::class));
    }

    public function test_system_pages_cannot_be_deleted(): void
    {
        $home = Page::where('slug', 'home')->first();
        $editor = User::factory()->create()->assignRole('editor');

        $this->assertFalse($editor->can('delete', $home));

        // Holds for the super admin too, whose gate bypass skips the policy.
        $this->assertFalse($home->delete());
        $this->assertNotSoftDeleted($home);
    }
}
