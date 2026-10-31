<?php

namespace App\Http\Middleware;

use App\Models\WebsiteSetting;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Lets editors write {company} anywhere in content, so renaming the business
 * in Site Settings updates every page without touching a single record.
 */
class ReplaceBrandTokens
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($response instanceof JsonResponse) {
            $name = trim((string) WebsiteSetting::value('company.name', config('app.name')));
            $escaped = substr((string) json_encode($name, JSON_UNESCAPED_UNICODE), 1, -1);

            $response->setContent(str_replace('{company}', $escaped, (string) $response->getContent()));
        }

        return $response;
    }
}
