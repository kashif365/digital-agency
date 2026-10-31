<?php

namespace App\Providers;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\ContactSubmission;
use App\Models\Faq;
use App\Models\Industry;
use App\Models\Lead;
use App\Models\Media;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Redirect;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\Testimonial;
use App\Models\User;
use App\Policies\BlogPolicy;
use App\Policies\ContentPolicy;
use App\Policies\LeadPolicy;
use App\Policies\MediaPolicy;
use App\Policies\PagePolicy;
use App\Policies\SettingsPolicy;
use App\Policies\UserPolicy;
use Illuminate\Auth\Events\Failed;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Applied here, not in bootstrap/app.php, which runs before .env is loaded.
        if ($proxies = config('agency.trusted_proxies')) {
            TrustProxies::at($proxies === '*' ? '*' : explode(',', $proxies));
        }

        Gate::before(fn (User $user) => $user->hasRole('super_admin') ? true : null);

        foreach ([
            Service::class => ContentPolicy::class,
            ServiceCategory::class => ContentPolicy::class,
            Industry::class => ContentPolicy::class,
            Portfolio::class => ContentPolicy::class,
            Testimonial::class => ContentPolicy::class,
            Faq::class => ContentPolicy::class,
            Page::class => PagePolicy::class,
            BlogPost::class => BlogPolicy::class,
            BlogCategory::class => BlogPolicy::class,
            Media::class => MediaPolicy::class,
            Lead::class => LeadPolicy::class,
            ContactSubmission::class => LeadPolicy::class,
            Redirect::class => SettingsPolicy::class,
            User::class => UserPolicy::class,
        ] as $model => $policy) {
            Gate::policy($model, $policy);
        }

        Event::listen(Failed::class, fn (Failed $event) => Log::channel('security')->warning('Failed admin panel login', [
            'email' => $event->credentials['email'] ?? null,
            'ip' => request()->ip(),
        ]));

        // Generous because Next.js renders pages from a single server IP.
        RateLimiter::for('api', fn (Request $request) => Limit::perMinute(600)->by($request->ip()));

        RateLimiter::for('forms', fn (Request $request) => [
            Limit::perMinute(5)->by($request->ip()),
            Limit::perHour(20)->by($request->ip()),
        ]);

        RateLimiter::for('admin-login', fn (Request $request) => [
            Limit::perMinute(5)->by(strtolower((string) $request->input('email')).'|'.$request->ip()),
            Limit::perMinute(20)->by($request->ip()),
        ]);
    }
}
