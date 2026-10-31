<?php

namespace Tests\Feature;

use App\Enums\ContentStatus;
use App\Enums\LeadStatus;
use App\Models\Lead;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\WebsiteSetting;
use App\Notifications\NewLeadReceived;
use App\Providers\AppServiceProvider;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Tests\TestCase;

class LeadSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private Service $service;

    protected function setUp(): void
    {
        parent::setUp();

        Notification::fake();
        Cache::flush();
        config(['agency.admin_notification_email' => 'owner@example.com']);

        $category = ServiceCategory::create(['name' => 'Search', 'slug' => 'search']);
        $this->service = Service::create([
            'service_category_id' => $category->id,
            'title' => 'SEO',
            'slug' => 'seo',
            'short_description' => 'Search work.',
            'status' => ContentStatus::Published,
        ]);
        WebsiteSetting::put('forms.budget_ranges', ['Not sure yet'], true);
    }

    private function payload(array $overrides = []): array
    {
        return [
            'full_name' => 'Sam Rivera',
            'business_name' => 'Rivera Plumbing',
            'email' => 'sam@example.com',
            'phone' => '+1 (555) 010-2030',
            'website' => 'riveraplumbing.example',
            'service_id' => $this->service->id,
            'budget' => 'Not sure yet',
            'message' => 'We want more local inquiries this year.',
            'source_page' => '/free-consultation',
            ...$overrides,
        ];
    }

    public function test_a_valid_lead_is_stored_and_the_admin_is_notified(): void
    {
        $this->postJson('/api/v1/leads', $this->payload())
            ->assertCreated()
            ->assertJsonStructure(['message']);

        $lead = Lead::sole();

        $this->assertSame(LeadStatus::New, $lead->status);
        $this->assertSame('SEO', $lead->service_name);
        $this->assertSame('https://riveraplumbing.example', $lead->website);

        Notification::assertSentOnDemand(
            NewLeadReceived::class,
            fn ($notification, $channels, $notifiable) => $notifiable->routes['mail'] === 'owner@example.com'
        );
    }

    /**
     * Stateful API middleware makes browsers on the site's own domain need a CSRF token,
     * which rejects every public form with a 419. Laravel skips CSRF checks during tests,
     * so a request-level test cannot see this and the middleware itself is asserted.
     */
    public function test_the_public_api_never_uses_cookie_sessions(): void
    {
        $this->assertNotContains(
            EnsureFrontendRequestsAreStateful::class,
            app('router')->getMiddlewareGroups()['api']
        );
    }

    public function test_the_notification_is_queued(): void
    {
        $this->assertContains(
            ShouldQueue::class,
            class_implements(NewLeadReceived::class)
        );
    }

    public function test_required_fields_are_validated(): void
    {
        $this->postJson('/api/v1/leads', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['full_name', 'business_name', 'email', 'phone', 'service_id', 'message']);

        $this->assertDatabaseCount('leads', 0);
    }

    public function test_website_and_budget_are_optional(): void
    {
        $this->postJson('/api/v1/leads', $this->payload(['website' => null, 'budget' => null]))->assertCreated();

        $this->assertDatabaseCount('leads', 1);
    }

    public function test_an_unpublished_service_is_rejected(): void
    {
        $this->service->update(['status' => ContentStatus::Draft]);

        $this->postJson('/api/v1/leads', $this->payload())->assertJsonValidationErrors('service_id');
    }

    public function test_a_budget_outside_the_configured_options_is_rejected(): void
    {
        $this->postJson('/api/v1/leads', $this->payload(['budget' => 'Free']))->assertJsonValidationErrors('budget');
    }

    public function test_a_filled_honeypot_looks_successful_but_stores_nothing(): void
    {
        $this->postJson('/api/v1/leads', $this->payload(['company_fax' => '555']))->assertCreated();

        $this->assertDatabaseCount('leads', 0);
        Notification::assertNothingSent();
    }

    public function test_a_submission_faster_than_a_human_stores_nothing(): void
    {
        $this->postJson('/api/v1/leads', $this->payload(['rendered_at' => now()->getTimestampMs()]))->assertCreated();

        $this->assertDatabaseCount('leads', 0);
    }

    public function test_a_message_full_of_links_stores_nothing(): void
    {
        $spam = 'https://a.example https://b.example https://c.example https://d.example buy now';

        $this->postJson('/api/v1/leads', $this->payload(['message' => $spam]))->assertCreated();

        $this->assertDatabaseCount('leads', 0);
    }

    public function test_a_failed_save_does_not_block_the_visitors_retry(): void
    {
        $failing = true;

        Event::listen('eloquent.creating: '.Lead::class, function () use (&$failing) {
            if ($failing) {
                throw new \RuntimeException('Database unavailable');
            }
        });

        $this->postJson('/api/v1/leads', $this->payload())->assertServerError();
        $this->assertDatabaseCount('leads', 0);

        $failing = false;

        $this->postJson('/api/v1/leads', $this->payload())->assertCreated();
        $this->assertDatabaseCount('leads', 1);
    }

    public function test_trusted_proxies_are_read_from_config_so_rate_limits_see_real_visitors(): void
    {
        config(['agency.trusted_proxies' => '*']);
        (new AppServiceProvider($this->app))->boot();

        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.1', 'HTTP_X_FORWARDED_FOR' => '203.0.113.9'])
            ->postJson('/api/v1/leads', $this->payload())
            ->assertCreated();

        TrustProxies::flushState();

        $this->assertSame('203.0.113.9', Lead::sole()->ip_address);
    }

    public function test_a_duplicate_rapid_submission_creates_one_lead_and_one_email(): void
    {
        $this->postJson('/api/v1/leads', $this->payload())->assertCreated();
        $this->postJson('/api/v1/leads', $this->payload())->assertCreated();

        $this->assertDatabaseCount('leads', 1);
        Notification::assertSentOnDemandTimes(NewLeadReceived::class, 1);
    }

    public function test_the_same_person_can_send_a_different_request(): void
    {
        $this->postJson('/api/v1/leads', $this->payload())->assertCreated();
        $this->postJson('/api/v1/leads', $this->payload(['message' => 'A separate question about paid ads.']))->assertCreated();

        $this->assertDatabaseCount('leads', 2);
    }

    public function test_the_endpoint_is_rate_limited(): void
    {
        foreach (range(1, 5) as $attempt) {
            $this->postJson('/api/v1/leads', $this->payload(['message' => "Attempt number {$attempt} here."]))->assertCreated();
        }

        $this->postJson('/api/v1/leads', $this->payload(['message' => 'One attempt too many.']))->assertTooManyRequests();
    }
}
