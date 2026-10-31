<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Model;

class SeoData
{
    /** Merges a record's SEO row over sensible defaults taken from its own content. */
    public static function for(Model $model, ?string $title, ?string $description): array
    {
        $seo = $model->seo;

        return [
            'title' => $seo?->meta_title ?: $title,
            'description' => $seo?->meta_description ?: $description,
            'canonical' => $seo?->canonical_url,
            'noindex' => (bool) $seo?->noindex,
            'og_image' => $seo?->ogImage?->url ?? $model->featuredMedia?->url,
        ];
    }
}
