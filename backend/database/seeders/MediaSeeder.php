<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/** Adds the starter blog photos to the media library, where editors can replace them. */
class MediaSeeder extends Seeder
{
    private const FOLDER = 'starter';

    public const IMAGES = [
        'blog-seo-ppc' => ['blog-seo-ppc.jpg', 'Research notes', 'People taking notes beside a laptop'],
        'blog-strategy' => ['blog-strategy.jpg', 'Strategy workshop', 'People working through sticky notes at a table'],
        'blog-website' => ['blog-website.jpg', 'Laptop on a desk', 'A laptop on a wooden desk'],
        'blog-local' => ['blog-local.jpg', 'Local planning meeting', 'A small team in a planning meeting'],
        'blog-measure' => ['blog-measure.jpg', 'Performance review', 'A team reviewing results together in a meeting room'],
        'blog-social' => ['blog-social.jpg', 'Content creator tiles', 'Letter tiles spelling content creator'],
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
