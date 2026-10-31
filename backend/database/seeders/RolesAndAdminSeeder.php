<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndAdminSeeder extends Seeder
{
    public const ROLES = [
        'super_admin' => [],
        'admin' => ['view leads', 'manage leads', 'export leads', 'manage content', 'manage blog', 'manage media', 'manage settings', 'manage users'],
        'editor' => ['manage content', 'manage blog', 'manage media'],
        'sales' => ['view leads', 'manage leads', 'export leads'],
    ];

    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        foreach (self::ROLES['admin'] as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        foreach (self::ROLES as $name => $permissions) {
            Role::findOrCreate($name, 'web')->syncPermissions($permissions);
        }

        $email = config('agency.seed.admin_email');
        $password = config('agency.seed.admin_password');

        if (! $email || ! $password) {
            $this->command?->warn('ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD not set, so no admin user was created.');

            return;
        }

        User::firstOrCreate(['email' => $email], [
            'name' => 'Site Administrator',
            'password' => $password,
        ])->assignRole('super_admin');
    }
}
