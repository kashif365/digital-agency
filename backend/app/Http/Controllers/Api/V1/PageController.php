<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\Page;

class PageController extends Controller
{
    public function show(string $slug): PageResource
    {
        $page = Page::published()
            ->where('slug', $slug)
            ->with(['sections' => fn ($query) => $query->where('is_visible', true), 'seo.ogImage'])
            ->firstOrFail();

        return new PageResource($page);
    }
}
