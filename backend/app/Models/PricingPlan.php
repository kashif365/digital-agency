<?php

namespace App\Models;

use App\Enums\ContentStatus;
use App\Models\Concerns\Publishable;
use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    use Publishable, RevalidatesFrontend;

    protected $fillable = [
        'name', 'price', 'period', 'description', 'features', 'cta_label', 'cta_url',
        'is_recommended', 'sort_order', 'status',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_recommended' => 'boolean',
            'status' => ContentStatus::class,
        ];
    }
}
