<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Portfolio;
use App\Models\Service;
use Illuminate\Database\Seeder;

/**
 * Illustrative samples only. They carry no client names or outcomes, are labelled
 * publicly, and drop out of the listing as soon as real work is published.
 */
class PortfolioSeeder extends Seeder
{
    private const IMAGES = [
        'sample-local-service-website' => 'work-website',
        'sample-search-visibility-roadmap' => 'work-roadmap',
        'sample-multi-channel-campaign' => 'work-campaign',
    ];

    public function run(): void
    {
        $rows = [...require __DIR__.'/content/portfolio.php', ...require __DIR__.'/content/portfolio-extra.php'];

        foreach ($rows as $index => $row) {
            $project = Portfolio::firstOrCreate(['slug' => $row['slug']], [
                'title' => $row['title'],
                'is_illustrative' => true,
                'summary' => $row['summary'],
                'overview' => $row['overview'],
                'challenges' => $row['challenges'],
                'strategy' => $row['strategy'],
                'sort_order' => $index + 1,
                'status' => ContentStatus::Published,
            ]);

            if ($project->wasRecentlyCreated) {
                $project->services()->sync(Service::whereIn('slug', $row['services'])->pluck('id'));
            }

            $image = $row['image_key'] ?? self::IMAGES[$row['slug']] ?? null;

            if ($image && ! $project->featured_media_id) {
                $project->update(['featured_media_id' => MediaSeeder::id($image)]);
            }
        }
    }
}
