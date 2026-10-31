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
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFeaturedMedia, HasSeo, Publishable, RevalidatesFrontend, SoftDeletes;

    protected $fillable = [
        'service_category_id', 'title', 'slug', 'short_description', 'icon', 'hero_heading', 'hero_text',
        'overview', 'audience', 'problems', 'deliverables', 'process', 'benefits', 'featured_media_id',
        'is_featured', 'featured_order', 'sort_order', 'status',
    ];

    protected function casts(): array
    {
        return [
            'overview' => SanitizedHtml::class,
            'audience' => 'array',
            'problems' => 'array',
            'deliverables' => 'array',
            'process' => 'array',
            'benefits' => 'array',
            'is_featured' => 'boolean',
            'status' => ContentStatus::class,
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id');
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(Faq::class)->orderBy('sort_order');
    }

    public function portfolios(): BelongsToMany
    {
        return $this->belongsToMany(Portfolio::class);
    }

    public function industries(): BelongsToMany
    {
        return $this->belongsToMany(Industry::class);
    }
}
