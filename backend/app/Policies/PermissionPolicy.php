<?php

namespace App\Policies;

use App\Models\User;

/** Grants every ability from a single permission. Subclasses name the permission. */
abstract class PermissionPolicy
{
    protected string $permission;

    protected function allowed(User $user): bool
    {
        return $user->can($this->permission);
    }

    public function viewAny(User $user): bool
    {
        return $this->allowed($user);
    }

    public function view(User $user, mixed $record): bool
    {
        return $this->allowed($user);
    }

    public function create(User $user): bool
    {
        return $this->allowed($user);
    }

    public function update(User $user, mixed $record): bool
    {
        return $this->allowed($user);
    }

    public function delete(User $user, mixed $record): bool
    {
        return $this->allowed($user);
    }

    public function deleteAny(User $user): bool
    {
        return $this->allowed($user);
    }

    public function restore(User $user, mixed $record): bool
    {
        return $this->allowed($user);
    }

    public function restoreAny(User $user): bool
    {
        return $this->allowed($user);
    }

    public function forceDelete(User $user, mixed $record): bool
    {
        return $this->allowed($user);
    }

    public function forceDeleteAny(User $user): bool
    {
        return $this->allowed($user);
    }

    public function reorder(User $user): bool
    {
        return $this->allowed($user);
    }
}
