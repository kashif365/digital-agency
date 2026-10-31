<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    private const IMAGES = [
        'seo-vs-ppc-which-is-right-for-your-business' => 'blog-seo-ppc',
        'how-to-create-a-digital-marketing-strategy' => 'blog-strategy',
        'common-website-mistakes-that-reduce-conversions' => 'blog-website',
        'beginners-guide-to-local-seo' => 'blog-local',
        'how-to-measure-marketing-campaign-performance' => 'blog-measure',
        'social-media-marketing-tips-for-small-businesses' => 'blog-social',
    ];

    public function run(): void
    {
        foreach (['SEO' => 'seo', 'Paid Advertising' => 'paid-advertising', 'Strategy' => 'strategy', 'Websites' => 'websites', 'Social Media' => 'social-media'] as $name => $slug) {
            BlogCategory::firstOrCreate(['slug' => $slug], ['name' => $name]);
        }

        foreach (require __DIR__.'/content/blog.php' as $index => $row) {
            $post = BlogPost::firstOrCreate(['slug' => $row['slug']], [
                'blog_category_id' => BlogCategory::where('slug', $row['category'])->value('id'),
                'title' => $row['title'],
                'excerpt' => $row['excerpt'],
                'body' => $row['body'],
                'author_name' => '{company} Editorial Team',
                'status' => ContentStatus::Published,
                'published_at' => now()->subDays(($index + 1) * 4),
            ]);

            if ($post->wasRecentlyCreated) {
                $post->seo()->create(['meta_title' => $row['title'], 'meta_description' => $row['excerpt']]);
            }

            if (! $post->featured_media_id) {
                $post->update(['featured_media_id' => MediaSeeder::id(self::IMAGES[$row['slug']])]);
            }
        }
    }
}
