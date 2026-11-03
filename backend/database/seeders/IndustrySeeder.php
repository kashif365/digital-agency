<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Industry;
use App\Models\Service;
use Illuminate\Database\Seeder;

class IndustrySeeder extends Seeder
{
    /** Starter photo for each industry, by slug. */
    public const IMAGES = [
        'healthcare-wellness' => 'industry-healthcare', 'real-estate' => 'industry-real-estate', 'e-commerce' => 'industry-ecommerce',
        'automotive' => 'industry-automotive', 'logistics-transportation' => 'industry-logistics', 'professional-services' => 'industry-professional',
        'home-services' => 'industry-home-services', 'education-training' => 'industry-education',
    ];

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
                'featured_media_id' => isset(self::IMAGES[$row['slug']]) ? MediaSeeder::id(self::IMAGES[$row['slug']]) : null,
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
