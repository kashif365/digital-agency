<?php

namespace App\Models\Concerns;

use App\Jobs\RevalidateFrontend;

trait RevalidatesFrontend
{
    protected static function bootRevalidatesFrontend(): void
    {
        $dispatch = fn () => RevalidateFrontend::request();

        static::saved($dispatch);
        static::deleted($dispatch);
    }
}
