<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\IndustryCardResource;
use App\Http\Resources\IndustryResource;
use App\Models\Industry;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class IndustryController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return IndustryCardResource::collection(
            Industry::published()->with('featuredMedia')->orderBy('sort_order')->get()
        );
    }

    public function show(string $slug): IndustryResource
    {
        $industry = Industry::published()
            ->where('slug', $slug)
            ->where('has_page', true)
            ->with([
                'featuredMedia',
                'seo.ogImage',
                'services' => fn ($query) => $query->published()->with(['category', 'featuredMedia'])->orderBy('sort_order'),
            ])
            ->firstOrFail();

        return new IndustryResource($industry);
    }
}
