<?php

namespace App\Policies;

class ContentPolicy extends PermissionPolicy
{
    protected string $permission = 'manage content';
}
