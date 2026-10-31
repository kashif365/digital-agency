<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/** Adds the starter photos to the media library, where editors can replace them. */
class MediaSeeder extends Seeder
{
    private const FOLDER = 'starter';

    public const IMAGES = [
        'hero' => ['hero.jpg', 'Team strategy session', 'A marketing team discussing a campaign in a bright office'],
        'about' => ['about.jpg', 'Team conversation', 'Colleagues talking together in an office'],
        'split-one' => ['split-one.jpg', 'Reviewing a plan', 'Three colleagues reviewing work on a laptop'],
        'split-two' => ['split-two.jpg', 'Planning on paper', 'Two people planning at a desk with laptops'],
        'banner' => ['banner.jpg', 'Working session', 'A team working around a dark wooden table with laptops'],
        'blog-seo-ppc' => ['blog-seo-ppc.jpg', 'Research notes', 'People taking notes beside a laptop'],
        'blog-strategy' => ['blog-strategy.jpg', 'Strategy workshop', 'People working through sticky notes at a table'],
        'blog-website' => ['blog-website.jpg', 'Laptop on a desk', 'A laptop on a wooden desk'],
        'blog-local' => ['blog-local.jpg', 'Local planning meeting', 'A small team in a planning meeting'],
        'blog-measure' => ['blog-measure.jpg', 'Performance review', 'A team reviewing results together in a meeting room'],
        'blog-social' => ['blog-social.jpg', 'Content creator tiles', 'Letter tiles spelling content creator'],
        'work-website' => ['work-website.jpg', 'Overhead team meeting', 'A team around a table seen from above'],
        'work-roadmap' => ['work-roadmap.jpg', 'Roadmap discussion', 'Two colleagues discussing a plan at a laptop'],
        'work-campaign' => ['work-campaign.jpg', 'Campaign review', 'A team reviewing a campaign plan together'],
    ];

    public function run(): void
    {
        foreach (self::IMAGES as [$file, $title, $alt]) {
            if (Media::where('folder', self::FOLDER)->where('title', $title)->exists()) {
                continue;
            }

            $path = 'media/'.Str::random(32).'.jpg';
            Storage::disk('public')->put($path, (string) file_get_contents(__DIR__.'/images/'.$file));

            Media::create(['title' => $title, 'alt_text' => $alt, 'folder' => self::FOLDER, 'path' => $path]);
        }
    }

    public static function id(string $key): ?int
    {
        return Media::where('folder', self::FOLDER)->where('title', self::IMAGES[$key][1])->value('id');
    }
}
