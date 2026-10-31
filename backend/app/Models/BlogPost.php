<?php

namespace App\Models;

use App\Casts\SanitizedHtml;
use App\Enums\ContentStatus;
use App\Models\Concerns\HasFeaturedMedia;
use App\Models\Concerns\HasSeo;
use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogPost extends Model
{
    use HasFeaturedMedia, HasSeo, RevalidatesFrontend, SoftDeletes;

    protected $fillable = [
        'blog_category_id', 'title', 'slug', 'excerpt', 'body', 'featured_media_id',
        'author_name', 'author_bio', 'status', 'published_at',
    ];

    protected function casts(): array
    {
        return [
            'body' => SanitizedHtml::class,
            'status' => ContentStatus::class,
            'published_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        // A post published without a date would otherwise never appear.
        static::saving(function (BlogPost $post) {
            if ($post->status === ContentStatus::Published && ! $post->published_at) {
                $post->published_at = now();
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    /** Published posts, plus scheduled posts whose time has arrived. */
    public function scopeLive(Builder $query): Builder
    {
        return $query
            ->whereIn('status', [ContentStatus::Published, ContentStatus::Scheduled])
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
