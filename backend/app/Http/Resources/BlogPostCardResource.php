<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostCardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'author_name' => $this->author_name,
            'published_at' => $this->published_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'read_minutes' => max(1, (int) ceil(str_word_count(strip_tags($this->body)) / 200)),
            'category' => $this->category ? new BlogCategoryResource($this->category) : null,
            'image' => $this->featuredMedia?->toPublicArray(),
        ];
    }
}
