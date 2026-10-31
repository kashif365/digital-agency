<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldBeUniqueUntilProcessing;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

/**
 * Tells Next.js to drop its cached CMS data. A short delay plus the unique lock
 * collapses a burst of saves into one call. If it fails, ISR timeouts still apply.
 */
class RevalidateFrontend implements ShouldBeUniqueUntilProcessing, ShouldQueue
{
    use Queueable;

    public int $tries = 2;

    public int $uniqueFor = 30;

    public static function request(): void
    {
        if (config('agency.revalidate_secret')) {
            static::dispatch()->delay(now()->addSeconds(3));
        }
    }

    public function handle(): void
    {
        Http::timeout(5)
            ->withHeaders(['x-revalidate-secret' => config('agency.revalidate_secret')])
            ->post(rtrim(config('agency.frontend_url'), '/').'/api/revalidate')
            ->throw();
    }
}
