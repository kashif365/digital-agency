<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy extends PermissionPolicy
{
    protected string $permission = 'manage users';

    /** Only a super admin may touch a super admin, so an admin cannot take one over. */
    public function update(User $user, mixed $record): bool
    {
        return ! $record->hasRole('super_admin') && parent::update($user, $record);
    }

    public function delete(User $user, mixed $record): bool
    {
        return $user->isNot($record) && ! $record->hasRole('super_admin') && parent::delete($user, $record);
    }
}
