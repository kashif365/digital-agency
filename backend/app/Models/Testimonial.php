<?php

namespace App\Models;

use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Testimonial extends Model
{
    use RevalidatesFrontend, SoftDeletes;

    protected $fillable = [
        'customer_name', 'company_name', 'body', 'rating', 'avatar_media_id',
        'testimonial_date', 'is_approved', 'sort_order',
    ];

    protected function casts(): array
    {
        return ['is_approved' => 'boolean', 'testimonial_date' => 'date', 'rating' => 'integer'];
    }

    public function avatar(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'avatar_media_id');
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('is_approved', true);
    }
}
