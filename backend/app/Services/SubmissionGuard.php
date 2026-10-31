<?php

namespace App\Services;

use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/** Shared protection for the public lead and contact endpoints. */
class SubmissionGuard
{
    public function spamReason(Request $request, string $message): ?string
    {
        if ($request->filled('company_fax')) {
            return 'honeypot';
        }

        $renderedAt = (int) $request->input('rendered_at');

        if ($renderedAt > 0 && (now()->getTimestampMs() - $renderedAt) < config('agency.min_fill_seconds') * 1000) {
            return 'too_fast';
        }

        if (preg_match_all('~https?://|www\.~i', $message) > config('agency.max_links_in_message')) {
            return 'too_many_links';
        }

        return null;
    }

    public function logRejected(Request $request, string $reason): void
    {
        Log::channel('security')->info('Form submission rejected', [
            'reason' => $reason,
            'path' => $request->path(),
            'ip' => $request->ip(),
        ]);
    }

    public function fingerprint(string $type, string ...$parts): string
    {
        return hash('sha256', $type.'|'.mb_strtolower(implode('|', array_map(trim(...), $parts))));
    }

    /** Atomically claims the fingerprint; false means this exact submission just arrived. */
    public function claim(string $fingerprint): bool
    {
        return Cache::add("submission:{$fingerprint}", true, config('agency.duplicate_window_seconds'));
    }

    public function notificationRecipient(): ?string
    {
        return WebsiteSetting::value('notifications.lead_email') ?: config('agency.admin_notification_email');
    }

    public function successMessage(): string
    {
        return WebsiteSetting::value('forms.success_message')
            ?: 'Thank you. Your request has been received and our team will follow up with you.';
    }
}
