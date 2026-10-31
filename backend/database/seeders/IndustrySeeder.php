<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Industry;
use App\Models\Service;
use Illuminate\Database\Seeder;

class IndustrySeeder extends Seeder
{
    public function run(): void
    {
        foreach (require __DIR__.'/content/industries.php' as $index => $row) {
            $industry = Industry::firstOrCreate(['slug' => $row['slug']], [
                'name' => $row['name'],
                'icon' => $row['icon'],
                'short_description' => $row['short'],
                'overview' => $row['overview'],
                'challenges' => ServiceSeeder::items($row['challenges']),
                'approach' => ServiceSeeder::items($row['approach']),
                'sort_order' => $index + 1,
                'status' => ContentStatus::Published,
            ]);

            if ($industry->wasRecentlyCreated) {
                $industry->services()->sync(Service::whereIn('slug', $row['services'])->pluck('id'));
                $industry->seo()->create([
                    'meta_title' => "Digital Marketing for {$row['name']}",
                    'meta_description' => $row['short'],
                ]);
            }
        }
    }
}
