<?php

namespace App\Observers;

use App\Models\Media;
use App\Support\ImageOptimizer;
use Illuminate\Support\Facades\Storage;

class MediaObserver
{
    public function __construct(private ImageOptimizer $optimizer) {}

    public function saving(Media $media): void
    {
        if ($media->isDirty('path') && $media->path) {
            $media->fill($this->optimizer->optimize($media->disk ?? 'public', $media->path));
        }

        if (! $media->exists) {
            $media->uploaded_by ??= auth()->id();
        }
    }

    public function deleted(Media $media): void
    {
        Storage::disk($media->disk)->delete($media->path);
    }
}
