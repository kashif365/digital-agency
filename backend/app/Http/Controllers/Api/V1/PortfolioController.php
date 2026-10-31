<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioCardResource;
use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PortfolioController extends Controller
{
    /** Illustrative samples only appear while no real client work has been published. */
    public function index(): AnonymousResourceCollection
    {
        $projects = Portfolio::published()
            ->with(['industry', 'featuredMedia', 'services'])
            ->orderBy('sort_order')
            ->get();

        $real = $projects->where('is_illustrative', false);

        return PortfolioCardResource::collection($real->isNotEmpty() ? $real->values() : $projects)
            ->additional(['meta' => ['illustrative_only' => $real->isEmpty() && $projects->isNotEmpty()]]);
    }

    public function show(string $slug): PortfolioResource
    {
        $portfolio = Portfolio::published()
            ->where('slug', $slug)
            ->with(['industry', 'featuredMedia', 'services', 'seo.ogImage'])
            ->firstOrFail();

        return new PortfolioResource($portfolio);
    }
}
