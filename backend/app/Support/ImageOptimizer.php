<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Re-encodes every upload to a size-capped WebP. Rebuilding the image from its
 * pixels also drops EXIF data and anything smuggled in after the image bytes.
 */
class ImageOptimizer
{
    private const MAX_WIDTH = 1920;

    private const QUALITY = 82;

    /** @return array{path: string, mime_type: string, size: int, width: int, height: int} */
    public function optimize(string $disk, string $path): array
    {
        $storage = Storage::disk($disk);
        $source = @imagecreatefromstring((string) $storage->get($path));

        if ($source === false) {
            $storage->delete($path);

            throw new \InvalidArgumentException('The uploaded file is not a valid image.');
        }

        imagepalettetotruecolor($source);
        imagealphablending($source, true);
        imagesavealpha($source, true);

        $image = imagesx($source) > self::MAX_WIDTH ? imagescale($source, self::MAX_WIDTH) : $source;
        imagesavealpha($image, true);

        ob_start();
        imagewebp($image, null, self::QUALITY);
        $encoded = (string) ob_get_clean();

        $directory = dirname($path);
        $target = ($directory === '.' ? '' : $directory.'/').Str::random(32).'.webp';
        $storage->put($target, $encoded);
        $storage->delete($path);

        return [
            'path' => $target,
            'mime_type' => 'image/webp',
            'size' => strlen($encoded),
            'width' => imagesx($image),
            'height' => imagesy($image),
        ];
    }
}
