<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Industry;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Service;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

class SitemapController extends Controller
{
    public function index(): JsonResponse
    {
        $indexable = fn (Builder $query) => $query->whereDoesntHave('seo', fn ($seo) => $seo->where('noindex', true));

        $entries = collect()
            ->merge(Page::published()->tap($indexable)->get()->map(
                fn (Page $page) => $this->entry($page->slug === 'home' ? '/' : "/{$page->slug}", $page->updated_at)
            ))
            ->merge(Service::published()->tap($indexable)->get()->map(
                fn (Service $service) => $this->entry("/services/{$service->slug}", $service->updated_at)
            ))
            ->merge(Industry::published()->where('has_page', true)->tap($indexable)->get()->map(
                fn (Industry $industry) => $this->entry("/industries/{$industry->slug}", $industry->updated_at)
            ))
            ->merge(Portfolio::published()->where('is_illustrative', false)->tap($indexable)->get()->map(
                fn (Portfolio $project) => $this->entry("/portfolio/{$project->slug}", $project->updated_at)
            ))
            ->merge(BlogPost::live()->tap($indexable)->get()->map(
                fn (BlogPost $post) => $this->entry("/blog/{$post->slug}", $post->updated_at)
            ));

        return response()->json(['data' => $entries->values()]);
    }

    private function entry(string $path, mixed $updatedAt): array
    {
        return ['path' => $path, 'lastmod' => $updatedAt?->toIso8601String()];
    }
}
