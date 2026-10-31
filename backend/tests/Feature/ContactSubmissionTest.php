<?php

namespace Tests\Feature;

use App\Models\ContactSubmission;
use App\Notifications\NewContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ContactSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private array $payload = [
        'name' => 'Sam Rivera',
        'email' => 'sam@example.com',
        'subject' => 'Pricing',
        'message' => 'Could you tell me more about your services?',
    ];

    protected function setUp(): void
    {
        parent::setUp();

        Notification::fake();
        Cache::flush();
        config(['agency.admin_notification_email' => 'owner@example.com']);
    }

    public function test_a_message_is_stored_and_the_admin_is_notified(): void
    {
        $this->postJson('/api/v1/contact', $this->payload)->assertCreated();

        $this->assertSame('Pricing', ContactSubmission::sole()->subject);
        Notification::assertSentOnDemand(NewContactMessage::class);
    }

    public function test_invalid_input_is_rejected(): void
    {
        $this->postJson('/api/v1/contact', ['email' => 'nope'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'message']);
    }

    public function test_the_honeypot_and_duplicate_protections_apply(): void
    {
        $this->postJson('/api/v1/contact', [...$this->payload, 'company_fax' => 'x'])->assertCreated();
        $this->assertDatabaseCount('contact_submissions', 0);

        $this->postJson('/api/v1/contact', $this->payload)->assertCreated();
        $this->postJson('/api/v1/contact', $this->payload)->assertCreated();
        $this->assertDatabaseCount('contact_submissions', 1);
    }
}
