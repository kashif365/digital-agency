<?php

namespace App\Http\Resources;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaIds = $this->sections->pluck('data.media_id')->filter()->unique();
        $media = $mediaIds->isEmpty() ? collect() : Media::whereIn('id', $mediaIds)->get()->keyBy('id');

        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'updated_at' => $this->updated_at?->toIso8601String(),
            'sections' => $this->sections->map(fn ($section) => [
                'id' => $section->id,
                'type' => $section->type,
                'data' => (object) [
                    ...collect($section->data)->except('media_id')->all(),
                    'image' => $media->get($section->data['media_id'] ?? null)?->toPublicArray(),
                ],
            ])->values(),
            'seo' => [
                'title' => $this->seo?->meta_title ?: $this->title,
                'description' => $this->seo?->meta_description,
                'canonical' => $this->seo?->canonical_url,
                'noindex' => (bool) $this->seo?->noindex,
                'og_image' => $this->seo?->ogImage?->url,
            ],
        ];
    }
}
