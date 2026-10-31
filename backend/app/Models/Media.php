<?php

namespace App\Models;

use App\Observers\MediaObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

#[ObservedBy(MediaObserver::class)]
class Media extends Model
{
    protected $table = 'media';

    protected $fillable = ['title', 'alt_text', 'folder', 'disk', 'path', 'mime_type', 'size', 'width', 'height', 'uploaded_by'];

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    protected function url(): Attribute
    {
        return Attribute::get(fn () => $this->path ? Storage::disk($this->disk)->url($this->path) : null);
    }

    /** @return array{url: ?string, alt: string, width: ?int, height: ?int} */
    public function toPublicArray(): array
    {
        return [
            'url' => $this->url,
            'alt' => $this->alt_text ?: $this->title,
            'width' => $this->width,
            'height' => $this->height,
        ];
    }
}
