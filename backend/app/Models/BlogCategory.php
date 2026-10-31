<?php

namespace App\Models;

use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogCategory extends Model
{
    use RevalidatesFrontend;

    protected $fillable = ['name', 'slug', 'description', 'sort_order'];

    public function posts(): HasMany
    {
        return $this->hasMany(BlogPost::class);
    }
}
