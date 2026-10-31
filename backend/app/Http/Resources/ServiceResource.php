<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class ServiceResource extends ServiceCardResource
{
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),
            'hero_heading' => $this->hero_heading ?: $this->title,
            'hero_text' => $this->hero_text ?: $this->short_description,
            'overview' => $this->overview,
            'audience' => $this->audience ?? [],
            'problems' => $this->problems ?? [],
            'deliverables' => $this->deliverables ?? [],
            'process' => $this->process ?? [],
            'benefits' => $this->benefits ?? [],
            'faqs' => FaqResource::collection($this->faqs),
            'related' => ServiceCardResource::collection($this->related ?? collect()),
            'portfolios' => PortfolioCardResource::collection($this->portfolios),
            'seo' => SeoData::for($this->resource, $this->title, $this->short_description),
        ];
    }
}
