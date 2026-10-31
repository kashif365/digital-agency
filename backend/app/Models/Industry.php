<?php

namespace App\Models;

use App\Casts\SanitizedHtml;
use App\Enums\ContentStatus;
use App\Models\Concerns\HasFeaturedMedia;
use App\Models\Concerns\HasSeo;
use App\Models\Concerns\Publishable;
use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Industry extends Model
{
    use HasFeaturedMedia, HasSeo, Publishable, RevalidatesFrontend, SoftDeletes;

    protected $fillable = [
        'name', 'slug', 'icon', 'short_description', 'overview', 'challenges', 'approach',
        'featured_media_id', 'has_page', 'sort_order', 'status',
    ];

    protected function casts(): array
    {
        return [
            'overview' => SanitizedHtml::class,
            'challenges' => 'array',
            'approach' => 'array',
            'has_page' => 'boolean',
            'status' => ContentStatus::class,
        ];
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class);
    }

    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class);
    }
}
