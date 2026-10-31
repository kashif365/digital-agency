<?php

namespace App\Models;

use App\Models\Concerns\RevalidatesFrontend;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;

class WebsiteSetting extends Model
{
    use RevalidatesFrontend;

    private const CACHE_KEY = 'website_settings';

    protected $fillable = ['key', 'value', 'is_public'];

    protected function casts(): array
    {
        return ['value' => 'array', 'is_public' => 'boolean'];
    }

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget(self::CACHE_KEY));
        static::deleted(fn () => Cache::forget(self::CACHE_KEY));
    }

    /** @return array<string, array{value: mixed, is_public: bool}> */
    public static function allCached(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, fn () => static::query()
            ->get(['key', 'value', 'is_public'])
            ->mapWithKeys(fn (self $row) => [$row->key => ['value' => $row->value, 'is_public' => $row->is_public]])
            ->all());
    }

    public static function value(string $key, mixed $default = null): mixed
    {
        return static::allCached()[$key]['value'] ?? $default;
    }

    /** Nested array of public settings only; private rows never leave this method. */
    public static function publicTree(): array
    {
        $public = Arr::where(static::allCached(), fn (array $row) => $row['is_public']);

        return Arr::undot(Arr::map($public, fn (array $row) => $row['value']));
    }

    public static function put(string $key, mixed $value, ?bool $isPublic = null): void
    {
        $row = static::firstOrNew(['key' => $key]);
        $row->value = $value;

        if ($isPublic !== null) {
            $row->is_public = $isPublic;
        }

        $row->save();
    }
}
