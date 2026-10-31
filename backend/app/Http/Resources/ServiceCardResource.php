<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceCardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'icon' => $this->icon,
            'is_featured' => $this->is_featured,
            'category' => ['name' => $this->category?->name, 'slug' => $this->category?->slug],
            'image' => $this->featuredMedia?->toPublicArray(),
        ];
    }
}
