<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceCardResource;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ServiceController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Service::published()->with(['category', 'featuredMedia']);

        if ($request->boolean('featured')) {
            $query->where('is_featured', true)->orderBy('featured_order');
        } else {
            $query->join('service_categories', 'service_categories.id', '=', 'services.service_category_id')
                ->orderBy('service_categories.sort_order')
                ->orderBy('services.sort_order')
                ->select('services.*');
        }

        $services = $query->get();

        return ServiceCardResource::collection($services);
    }

    public function show(string $slug): ServiceResource
    {
        $service = Service::published()
            ->where('slug', $slug)
            ->with([
                'category',
                'featuredMedia',
                'seo.ogImage',
                'faqs' => fn ($query) => $query->active(),
                'portfolios' => fn ($query) => $query->published()->with(['industry', 'featuredMedia', 'services']),
            ])
            ->firstOrFail();

        $service->setRelation('related', Service::published()
            ->with(['category', 'featuredMedia'])
            ->whereKeyNot($service->getKey())
            ->orderByRaw('service_category_id = ? desc', [$service->service_category_id])
            ->orderBy('sort_order')
            ->limit(3)
            ->get());

        return new ServiceResource($service);
    }
}
