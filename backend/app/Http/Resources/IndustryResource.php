<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class IndustryResource extends IndustryCardResource
{
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),
            'overview' => $this->overview,
            'challenges' => $this->challenges ?? [],
            'approach' => $this->approach ?? [],
            'services' => ServiceCardResource::collection($this->services),
            'seo' => SeoData::for($this->resource, "Digital Marketing for {$this->name}", $this->short_description),
        ];
    }
}
