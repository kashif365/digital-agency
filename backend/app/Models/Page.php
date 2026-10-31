<?php

namespace App\Models;

use App\Enums\ContentStatus;
use App\Models\Concerns\HasSeo;
use App\Models\Concerns\Publishable;
use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use HasSeo, Publishable, RevalidatesFrontend, SoftDeletes;

    protected $fillable = ['title', 'slug', 'is_system', 'status'];

    protected function casts(): array
    {
        return ['is_system' => 'boolean', 'status' => ContentStatus::class];
    }

    protected static function booted(): void
    {
        // Enforced here because the super admin gate bypass skips the policy.
        static::deleting(fn (Page $page) => ! $page->is_system);
    }

    public function sections(): HasMany
    {
        return $this->hasMany(PageSection::class)->orderBy('sort_order');
    }
}
