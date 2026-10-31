<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class BlogPostResource extends BlogPostCardResource
{
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),
            'body' => $this->body,
            'author_bio' => $this->author_bio,
            'related' => BlogPostCardResource::collection($this->related ?? collect()),
            'seo' => SeoData::for($this->resource, $this->title, $this->excerpt),
        ];
    }
}
