<?php

namespace App\Console\Commands;

use App\Enums\ContentStatus;
use App\Models\Industry;
use App\Models\Media;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\WebsiteSetting;
use Database\Seeders\IndustrySeeder;
use Database\Seeders\MediaSeeder;
use Database\Seeders\PageSeeder;
use Database\Seeders\PortfolioSeeder;
use Database\Seeders\ServiceSeeder;
use Database\Seeders\SettingsSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Seeders never overwrite, so new starter copy only reaches an existing database
 * through the admin or through this command. It is opt-in because it replaces
 * whatever editors have written on the pages it touches.
 */
class RefreshStarterContent extends Command
{
    protected $signature = 'content:refresh
        {--page=* : Only refresh these page slugs. Defaults to every built-in page.}
        {--navigation : Also reset the header menu, footer links, and header button}
        {--services : Also replace the one-line summary and page headline of every starter service}
        {--portfolio : Also rewrite the concept portfolio samples, with their screenshots and galleries. Real projects are never touched.}
        {--images : Also add the starter photography, and attach it to services and industries that have no image}
        {--photos : Also remove first-release stock photos from portfolio samples and the default page banner}
        {--force : Skip the confirmation prompt}';

    protected $description = 'Replace built-in page copy with the current starter content, overwriting admin edits to those pages';

    public function handle(): int
    {
        $rows = collect(PageSeeder::rows())->keyBy('slug');
        $slugs = $this->option('page') ?: $rows->keys()->all();
        $unknown = array_diff($slugs, $rows->keys()->all());

        if ($unknown !== []) {
            $this->error('No starter content for: '.implode(', ', $unknown));

            return self::FAILURE;
        }

        $this->warn('This replaces the sections and SEO text of: '.implode(', ', $slugs).'.');

        if ($this->option('navigation')) {
            $this->warn('It also resets: '.implode(', ', SettingsSeeder::NAVIGATION_KEYS).'.');
        }

        if ($this->option('services')) {
            $this->warn('It also replaces the summary and headline of every starter service.');
        }

        if ($this->option('portfolio')) {
            $this->warn('It also rewrites the concept portfolio samples.');
        }

        if (! $this->option('force') && ! $this->confirm('Continue?')) {
            return self::FAILURE;
        }

        // Media files are written to disk, so they are added before the transaction starts.
        if ($this->option('images') || $this->option('portfolio')) {
            $this->callSilently('db:seed', ['--class' => MediaSeeder::class, '--force' => true]);
        }

        DB::transaction(function () use ($rows, $slugs) {
            foreach ($slugs as $slug) {
                $row = $rows[$slug];
                $page = Page::firstOrCreate(['slug' => $slug], [
                    'title' => $row['title'],
                    'is_system' => $row['system'] ?? true,
                    'status' => ContentStatus::Published,
                ]);

                PageSeeder::fill($page, $row);
                $this->line("  Refreshed /{$slug}");
            }

            if ($this->option('navigation')) {
                $defaults = SettingsSeeder::defaults();

                foreach (SettingsSeeder::NAVIGATION_KEYS as $key) {
                    WebsiteSetting::put($key, $defaults[$key]);
                }

                $this->line('  Reset navigation settings');
            }

            if ($this->option('services')) {
                foreach (ServiceSeeder::rows() as $row) {
                    Service::where('slug', $row['slug'])->first()?->update(['short_description' => $row['short'], 'hero_heading' => $row['hero_heading']]);
                }

                $this->line('  Refreshed service summaries and headlines');
            }

            if ($this->option('images')) {
                $this->attachImages(Service::class, ServiceSeeder::IMAGES);
                $this->attachImages(Industry::class, IndustrySeeder::IMAGES);
                $this->line('  Added photos to services and industries without one');
            }

            if ($this->option('portfolio')) {
                foreach (PortfolioSeeder::rows() as $index => $row) {
                    $project = Portfolio::withTrashed()->firstOrNew(['slug' => $row['slug']]);

                    if ($project->exists && ! $project->is_illustrative) {
                        $this->line("  Skipped /portfolio/{$row['slug']}: it is marked as real client work");

                        continue;
                    }

                    PortfolioSeeder::fill($project, $row, $index);
                }

                $this->line('  Refreshed the concept portfolio samples');
            }

            if ($this->option('photos')) {
                $starter = Media::where('folder', MediaSeeder::FOLDER)->pluck('id');
                $projects = Portfolio::where('is_illustrative', true)->whereIn('featured_media_id', $starter)->get();

                $projects->each->update(['featured_media_id' => null]);
                $this->line("  Removed starter photos from {$projects->count()} portfolio samples");

                if ($starter->contains(WebsiteSetting::value('company.banner_media_id'))) {
                    WebsiteSetting::put('company.banner_media_id', null);
                    $this->line('  Removed the starter photo used as the default page banner');
                }
            }
        });

        $this->info('Done. The website refreshes as soon as the queue processes the change.');

        return self::SUCCESS;
    }

    /** @param  class-string<\Illuminate\Database\Eloquent\Model>  $model */
    private function attachImages(string $model, array $images): void
    {
        foreach ($images as $slug => $key) {
            $model::where('slug', $slug)->whereNull('featured_media_id')->first()?->update(['featured_media_id' => MediaSeeder::id($key)]);
        }
    }
}
