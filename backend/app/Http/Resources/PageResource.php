<?php

namespace App\Http\Resources;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $itemMediaIds = $this->sections->flatMap(fn ($section) => collect($section->data['items'] ?? [])->pluck('media_id'));
        $mediaIds = $this->sections->pluck('data.media_id')->merge($itemMediaIds)->filter()->unique();
        $media = $mediaIds->isEmpty() ? collect() : Media::whereIn('id', $mediaIds)->get()->keyBy('id');

        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'updated_at' => $this->updated_at?->toIso8601String(),
            'sections' => $this->sections->map(fn ($section) => [
                'id' => $section->id,
                'type' => $section->type,
                'data' => (object) [
                    ...collect($section->data)->except(['media_id', 'items'])->all(),
                    'image' => $media->get($section->data['media_id'] ?? null)?->toPublicArray(),
                    ...(isset($section->data['items']) ? ['items' => array_map(fn (array $item) => [
                        ...collect($item)->except('media_id')->all(),
                        'image' => $media->get($item['media_id'] ?? null)?->toPublicArray(),
                    ], $section->data['items'])] : []),
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
