<?php

namespace App\Notifications;

use App\Filament\Resources\Leads\LeadResource;
use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewLeadReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $backoff = 60;

    public function __construct(public Lead $lead) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $lead = $this->lead;

        return (new MailMessage)
            ->subject("New consultation request: {$lead->business_name}")
            ->replyTo($lead->email, $lead->full_name)
            ->greeting('New consultation request')
            ->line("Name: {$lead->full_name}")
            ->line("Business: {$lead->business_name}")
            ->line("Email: {$lead->email}")
            ->line("Phone: {$lead->phone}")
            ->line('Website: '.($lead->website ?: 'Not provided'))
            ->line('Service: '.($lead->service_name ?: 'Not specified'))
            ->line('Budget: '.($lead->budget ?: 'Not provided'))
            ->line("Goals: {$lead->message}")
            ->action('Open lead', LeadResource::getUrl('view', ['record' => $lead]));
    }
}
