<?php

namespace App\Policies;

use App\Models\User;

class PagePolicy extends ContentPolicy
{
    public function delete(User $user, mixed $record): bool
    {
        return ! $record->is_system && parent::delete($user, $record);
    }

    public function forceDelete(User $user, mixed $record): bool
    {
        return ! $record->is_system && parent::forceDelete($user, $record);
    }
}
