<?php

namespace App\Notifications;

use App\Models\ContactSubmission;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContactMessage extends Notification implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $backoff = 60;

    public function __construct(public ContactSubmission $submission) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $submission = $this->submission;

        return (new MailMessage)
            ->subject('New website message'.($submission->subject ? ": {$submission->subject}" : ''))
            ->replyTo($submission->email, $submission->name)
            ->greeting('New message from the contact form')
            ->line("Name: {$submission->name}")
            ->line("Email: {$submission->email}")
            ->line('Phone: '.($submission->phone ?: 'Not provided'))
            ->line("Message: {$submission->message}");
    }
}
