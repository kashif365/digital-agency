<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class PortfolioResource extends PortfolioCardResource
{
    public function toArray(Request $request): array
    {
        $seo = SeoData::for($this->resource, $this->title, $this->summary);

        return [
            ...parent::toArray($request),
            'overview' => $this->overview,
            'challenges' => $this->challenges,
            'strategy' => $this->strategy,
            'deliverables' => $this->deliverables ?? [],
            'gallery' => $this->galleryWithMedia(),
            // A concept has no live site to link to.
            'website_url' => $this->is_illustrative ? null : $this->website_url,
            'completed_on' => $this->completed_on?->toDateString(),
            // Never exposed unless verified; illustrative work has no real outcomes to claim.
            'outcomes' => $this->outcomes_verified && ! $this->is_illustrative ? $this->outcomes : null,
            'seo' => [...$seo, 'noindex' => $seo['noindex'] || $this->is_illustrative],
        ];
    }
}
