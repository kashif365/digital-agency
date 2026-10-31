<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        foreach (require __DIR__.'/content/pages.php' as $row) {
            $page = Page::firstOrCreate(['slug' => $row['slug']], [
                'title' => $row['title'],
                'is_system' => $row['system'] ?? true,
                'status' => ContentStatus::Published,
            ]);

            if (! $page->wasRecentlyCreated) {
                continue;
            }

            $page->seo()->create(['meta_title' => $row['meta_title'], 'meta_description' => $row['meta_description']]);

            foreach ($row['sections'] as $order => [$type, $data]) {
                if ($key = $data['image_key'] ?? null) {
                    $data['media_id'] = MediaSeeder::id($key);
                    unset($data['image_key']);
                }

                $page->sections()->create(['type' => $type, 'data' => $data, 'sort_order' => $order + 1]);
            }
        }
    }
}
