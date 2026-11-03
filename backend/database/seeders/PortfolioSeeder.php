<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Industry;
use App\Models\Portfolio;
use App\Models\Service;
use Illuminate\Database\Seeder;

/**
 * Concept projects only. They carry no client names or outcomes, are labelled
 * publicly, and drop out of the listing as soon as real work is published.
 */
class PortfolioSeeder extends Seeder
{
    /** @return array<int, array<string, mixed>> */
    public static function rows(): array
    {
        return require __DIR__.'/content/portfolio.php';
    }

    public function run(): void
    {
        foreach (self::rows() as $index => $row) {
            $project = Portfolio::firstOrNew(['slug' => $row['slug']]);

            if (! $project->exists) {
                self::fill($project, $row, $index);
            }
        }
    }

    /** Writes a concept project's content, images, and services, replacing what it had. */
    public static function fill(Portfolio $project, array $row, int $index): void
    {
        $project->fill([
            'title' => $row['title'],
            'is_illustrative' => true,
            'client_name' => null,
            'industry_id' => $row['industry'] ? Industry::where('slug', $row['industry'])->value('id') : null,
            'summary' => $row['summary'],
            'overview' => $row['overview'],
            'challenges' => $row['challenges'],
            'strategy' => $row['strategy'],
            'deliverables' => ServiceSeeder::items($row['deliverables']),
            'featured_media_id' => MediaSeeder::id($row['image']),
            'gallery' => array_map(fn (array $entry) => [
                'media_id' => MediaSeeder::id($entry[0]),
                'kind' => $entry[1],
                'caption' => $entry[2],
            ], $row['gallery']),
            'sort_order' => $index + 1,
            'status' => ContentStatus::Published,
        ])->save();

        $project->services()->sync(Service::whereIn('slug', $row['services'])->pluck('id'));
    }
}
