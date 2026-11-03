<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    private const CATEGORIES = [
        'search-marketing' => 'Search Marketing',
        'social-content' => 'Social & Content',
        'web-creative' => 'Web & Creative',
        'growth-analytics' => 'Growth & Analytics',
    ];

    /** Starter photo for each service, by slug. */
    public const IMAGES = [
        'search-engine-optimization' => 'service-seo', 'local-seo' => 'service-local-seo', 'technical-seo' => 'service-technical-seo',
        'pay-per-click-advertising' => 'service-ppc', 'social-media-marketing' => 'service-social-marketing',
        'social-media-management' => 'service-social-management', 'content-marketing' => 'service-content', 'video-marketing' => 'service-video',
        'website-design-development' => 'service-web', 'landing-page-design' => 'service-landing', 'branding-graphic-design' => 'service-branding',
        'email-marketing' => 'service-email', 'conversion-rate-optimization' => 'service-cro', 'marketing-analytics-reporting' => 'service-analytics',
    ];

    /** @return array<int, array<string, mixed>> */
    public static function rows(): array
    {
        return require __DIR__.'/content/services.php';
    }

    public function run(): void
    {
        foreach (array_keys(self::CATEGORIES) as $index => $slug) {
            ServiceCategory::firstOrCreate(['slug' => $slug], ['name' => self::CATEGORIES[$slug], 'sort_order' => $index + 1]);
        }

        foreach (self::rows() as $index => $row) {
            $service = Service::firstOrCreate(['slug' => $row['slug']], [
                'service_category_id' => ServiceCategory::where('slug', $row['category'])->value('id'),
                'title' => $row['title'],
                'icon' => $row['icon'],
                'short_description' => $row['short'],
                'hero_heading' => $row['hero_heading'],
                'hero_text' => $row['hero_text'],
                'overview' => $row['overview'],
                'audience' => self::items($row['audience']),
                'problems' => self::items($row['problems']),
                'deliverables' => self::items($row['deliverables']),
                'process' => self::items($row['process']),
                'benefits' => self::items($row['benefits']),
                'is_featured' => isset($row['homepage']),
                'featured_order' => $row['homepage'] ?? 0,
                'sort_order' => $index + 1,
                'status' => ContentStatus::Published,
                'featured_media_id' => isset(self::IMAGES[$row['slug']]) ? MediaSeeder::id(self::IMAGES[$row['slug']]) : null,
            ]);

            if (! $service->wasRecentlyCreated) {
                continue;
            }

            $service->seo()->create(['meta_title' => $row['meta_title'], 'meta_description' => $row['meta_description']]);

            foreach ($row['faqs'] as $order => [$question, $answer]) {
                $service->faqs()->create(['question' => $question, 'answer' => $answer, 'sort_order' => $order + 1]);
            }
        }
    }

    /** @param array<int, array{0: string, 1: string}> $pairs */
    public static function items(array $pairs): array
    {
        return array_map(fn (array $pair) => ['title' => $pair[0], 'text' => $pair[1]], $pairs);
    }
}
