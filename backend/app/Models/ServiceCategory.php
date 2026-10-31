<?php

namespace App\Models;

use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceCategory extends Model
{
    use RevalidatesFrontend;

    protected $fillable = ['name', 'slug', 'sort_order'];

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }
}
