<?php

namespace App\Models;

use App\Casts\SanitizedHtml;
use App\Enums\ContentStatus;
use App\Models\Concerns\HasFeaturedMedia;
use App\Models\Concerns\HasSeo;
use App\Models\Concerns\Publishable;
use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Portfolio extends Model
{
    use HasFeaturedMedia, HasSeo, Publishable, RevalidatesFrontend, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'client_name', 'industry_id', 'is_illustrative', 'summary', 'overview', 'challenges',
        'strategy', 'outcomes', 'outcomes_verified', 'featured_media_id', 'is_featured', 'sort_order', 'status',
    ];

    protected function casts(): array
    {
        return [
            'overview' => SanitizedHtml::class,
            'challenges' => SanitizedHtml::class,
            'strategy' => SanitizedHtml::class,
            'outcomes' => SanitizedHtml::class,
            'is_illustrative' => 'boolean',
            'outcomes_verified' => 'boolean',
            'is_featured' => 'boolean',
            'status' => ContentStatus::class,
        ];
    }

    public function industry(): BelongsTo
    {
        return $this->belongsTo(Industry::class);
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class);
    }
}
