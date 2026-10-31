<?php

namespace Tests\Feature;

use App\Enums\LeadStatus;
use App\Models\Lead;
use App\Models\User;
use Database\Seeders\RolesAndAdminSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndAdminSeeder::class);
    }

    private function userWithRole(string $role, array $attributes = []): User
    {
        return User::factory()->create($attributes)->assignRole($role);
    }

    private function lead(array $attributes = []): Lead
    {
        return Lead::create([
            'full_name' => 'Sam Rivera',
            'business_name' => 'Rivera Plumbing',
            'email' => 'sam@example.com',
            'phone' => '5550102030',
            'message' => 'We want more inquiries.',
            'fingerprint' => fake()->sha256(),
            ...$attributes,
        ]);
    }

    public function test_admin_routes_require_authentication(): void
    {
        $this->getJson('/api/v1/admin/leads')->assertUnauthorized();
        $this->getJson('/api/v1/admin/dashboard')->assertUnauthorized();
    }

    public function test_an_admin_can_log_in_and_receives_an_expiring_token(): void
    {
        $user = $this->userWithRole('sales', ['password' => 'correct-horse-battery']);

        $response = $this->postJson('/api/v1/admin/login', ['email' => $user->email, 'password' => 'correct-horse-battery'])
            ->assertOk()
            ->assertJsonStructure(['token', 'expires_at']);

        $this->withToken($response->json('token'))->getJson('/api/v1/admin/me')
            ->assertOk()
            ->assertJsonPath('data.email', $user->email);
    }

    public function test_bad_credentials_and_roleless_users_cannot_log_in(): void
    {
        $user = $this->userWithRole('sales', ['password' => 'correct-horse-battery']);
        $roleless = User::factory()->create(['password' => 'correct-horse-battery']);

        $this->postJson('/api/v1/admin/login', ['email' => $user->email, 'password' => 'wrong'])->assertUnprocessable();
        $this->postJson('/api/v1/admin/login', ['email' => $roleless->email, 'password' => 'correct-horse-battery'])->assertUnprocessable();
    }

    public function test_login_is_rate_limited(): void
    {
        foreach (range(1, 5) as $attempt) {
            $this->postJson('/api/v1/admin/login', ['email' => 'a@example.com', 'password' => 'wrong'])->assertUnprocessable();
        }

        $this->postJson('/api/v1/admin/login', ['email' => 'a@example.com', 'password' => 'wrong'])->assertTooManyRequests();
    }

    public function test_a_deactivated_user_is_blocked_even_with_a_valid_token(): void
    {
        Sanctum::actingAs($this->userWithRole('sales', ['is_active' => false]));

        $this->getJson('/api/v1/admin/leads')->assertForbidden();
    }

    public function test_an_editor_cannot_read_leads(): void
    {
        $lead = $this->lead();
        Sanctum::actingAs($this->userWithRole('editor'));

        $this->getJson('/api/v1/admin/leads')->assertForbidden();
        $this->getJson("/api/v1/admin/leads/{$lead->id}")->assertForbidden();
        $this->getJson('/api/v1/admin/leads/export')->assertForbidden();
        $this->patchJson("/api/v1/admin/leads/{$lead->id}", ['status' => 'won'])->assertForbidden();
    }

    public function test_leads_can_be_searched_and_filtered(): void
    {
        $this->lead();
        $this->lead(['full_name' => 'Other Person', 'email' => 'other@example.com', 'business_name' => 'Other Co', 'status' => LeadStatus::Won]);
        Sanctum::actingAs($this->userWithRole('sales'));

        $this->getJson('/api/v1/admin/leads?search=Rivera')->assertJsonCount(1, 'data');
        $this->getJson('/api/v1/admin/leads?status=won')->assertJsonCount(1, 'data')->assertJsonPath('data.0.full_name', 'Other Person');
    }

    public function test_changing_status_records_who_did_it(): void
    {
        $lead = $this->lead();
        $user = $this->userWithRole('sales');
        Sanctum::actingAs($user);

        $this->patchJson("/api/v1/admin/leads/{$lead->id}", ['status' => 'qualified'])
            ->assertOk()
            ->assertJsonPath('data.status', 'qualified')
            ->assertJsonPath('data.notes.0.body', 'Status changed from New to Qualified')
            ->assertJsonPath('data.notes.0.author', $user->name);
    }

    public function test_an_invalid_status_is_rejected(): void
    {
        $lead = $this->lead();
        Sanctum::actingAs($this->userWithRole('sales'));

        $this->patchJson("/api/v1/admin/leads/{$lead->id}", ['status' => 'nonsense'])->assertUnprocessable();
    }

    public function test_notes_can_be_added_and_history_shows_earlier_submissions(): void
    {
        $earlier = $this->lead(['message' => 'An earlier request.']);
        $lead = $this->lead();
        Sanctum::actingAs($this->userWithRole('sales'));

        $this->postJson("/api/v1/admin/leads/{$lead->id}/notes", ['body' => 'Called, left voicemail.'])->assertCreated();

        $this->getJson("/api/v1/admin/leads/{$lead->id}")
            ->assertJsonPath('data.notes.0.body', 'Called, left voicemail.')
            ->assertJsonPath('data.submission_history.0.id', $earlier->id);
    }

    public function test_the_export_neutralizes_spreadsheet_formulas(): void
    {
        $this->lead(['full_name' => '=HYPERLINK("http://evil.example")']);
        Sanctum::actingAs($this->userWithRole('sales'));

        $response = $this->get('/api/v1/admin/leads/export')->assertOk();
        $csv = $response->streamedContent();

        $this->assertStringContainsString("'=HYPERLINK", $csv);
        $this->assertStringContainsString('Rivera Plumbing', $csv);
    }

    public function test_the_export_lists_the_newest_leads_first(): void
    {
        $this->lead(['full_name' => 'Earliest Lead']);
        $this->lead(['full_name' => 'Latest Lead', 'email' => 'latest@example.com']);
        Sanctum::actingAs($this->userWithRole('sales'));

        $csv = $this->get('/api/v1/admin/leads/export')->assertOk()->streamedContent();

        $this->assertLessThan(strpos($csv, 'Earliest Lead'), strpos($csv, 'Latest Lead'));
    }

    public function test_the_dashboard_summarizes_every_status(): void
    {
        $this->lead();
        Sanctum::actingAs($this->userWithRole('sales'));

        $this->getJson('/api/v1/admin/dashboard')
            ->assertOk()
            ->assertJsonPath('data.total_leads', 1)
            ->assertJsonPath('data.new_leads', 1)
            ->assertJsonPath('data.leads_by_status.won', 0);
    }
}
