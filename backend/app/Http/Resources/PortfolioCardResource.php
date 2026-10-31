<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioCardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'client_name' => $this->client_name,
            'is_illustrative' => $this->is_illustrative,
            'summary' => $this->summary,
            'industry' => $this->industry?->name,
            'services' => $this->services->map->only(['title', 'slug'])->values(),
            'image' => $this->featuredMedia?->toPublicArray(),
        ];
    }
}
