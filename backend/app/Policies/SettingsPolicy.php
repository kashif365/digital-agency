<?php

namespace App\Policies;

class SettingsPolicy extends PermissionPolicy
{
    protected string $permission = 'manage settings';
}
