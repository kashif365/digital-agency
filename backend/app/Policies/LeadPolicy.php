<?php

namespace App\Policies;

use App\Models\User;

class LeadPolicy extends PermissionPolicy
{
    protected string $permission = 'manage leads';

    public function viewAny(User $user): bool
    {
        return $user->can('view leads');
    }

    public function view(User $user, mixed $record): bool
    {
        return $user->can('view leads');
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function export(User $user): bool
    {
        return $user->can('export leads');
    }
}
