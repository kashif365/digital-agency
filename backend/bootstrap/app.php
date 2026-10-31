<?php

use App\Http\Middleware\EnsureAdminIsActive;
use App\Http\Middleware\ReplaceBrandTokens;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // The API is token-only: no cookies means no CSRF surface, and public forms stay
        // reachable from the site. The cookie-authenticated admin panel keeps its own CSRF check.
        $middleware->throttleApi();

        $middleware->alias([
            'brand.tokens' => ReplaceBrandTokens::class,
            'admin.active' => EnsureAdminIsActive::class,
        ]);

        // Set TRUSTED_PROXIES behind a load balancer so rate limits see real client IPs.
        if ($proxies = env('TRUSTED_PROXIES')) {
            $middleware->trustProxies(at: $proxies === '*' ? '*' : explode(',', $proxies));
        }
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
