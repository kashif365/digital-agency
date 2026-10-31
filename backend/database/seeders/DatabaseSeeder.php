<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolesAndAdminSeeder::class,
            MediaSeeder::class,
            SettingsSeeder::class,
            ServiceSeeder::class,
            IndustrySeeder::class,
            PageSeeder::class,
            FaqSeeder::class,
            BlogSeeder::class,
            PortfolioSeeder::class,
        ]);
    }
}
