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
    public function run(): void
    {
        foreach (require __DIR__.'/content/portfolio.php' as $index => $row) {
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
        }
    }
}
