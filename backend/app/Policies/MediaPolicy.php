<?php

namespace App\Policies;

class MediaPolicy extends PermissionPolicy
{
    protected string $permission = 'manage media';
}
