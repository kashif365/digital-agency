<?php

namespace Tests\Feature;

use App\Enums\ContentStatus;
use App\Models\BlogPost;
use App\Models\Media;
use App\Models\Page;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SecurityTest extends TestCase
{
    use RefreshDatabase;

    private const XSS = '<p onclick="steal()">Safe</p><script>alert(1)</script><a href="javascript:alert(2)">x</a><img src="x" onerror="alert(3)">';

    public function test_rich_text_is_sanitized_on_save(): void
    {
        $post = BlogPost::create(['title' => 'T', 'slug' => 't', 'body' => self::XSS, 'status' => ContentStatus::Draft]);

        $this->assertStringContainsString('Safe', $post->body);

        foreach (['<script', 'onclick', 'onerror', 'javascript:'] as $needle) {
            $this->assertStringNotContainsString($needle, $post->body);
        }
    }

    public function test_page_section_bodies_are_sanitized_on_save(): void
    {
        $page = Page::create(['title' => 'P', 'slug' => 'p', 'status' => ContentStatus::Draft]);
        $section = $page->sections()->create(['type' => 'rich_text', 'data' => ['body' => self::XSS]]);

        $this->assertStringNotContainsString('<script', $section->fresh()->data['body']);
    }

    public function test_uploads_are_converted_to_webp_and_downscaled(): void
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->image('photo.jpg', 2400, 1200);
        $path = $file->store('media', 'public');

        $media = Media::create(['title' => 'Photo', 'alt_text' => 'A photo', 'path' => $path]);

        $this->assertSame('image/webp', $media->mime_type);
        $this->assertSame(1920, $media->width);
        $this->assertSame(960, $media->height);
        $this->assertStringEndsWith('.webp', $media->path);
        Storage::disk('public')->assertExists($media->path);
        Storage::disk('public')->assertMissing($path);
    }

    public function test_a_non_image_disguised_as_an_image_is_rejected_and_removed(): void
    {
        Storage::fake('public');
        Storage::disk('public')->put('media/evil.png', '<?php system($_GET["c"]);');

        try {
            Media::create(['title' => 'Evil', 'path' => 'media/evil.png']);
            $this->fail('Expected the upload to be rejected.');
        } catch (\InvalidArgumentException) {
            Storage::disk('public')->assertMissing('media/evil.png');
        }

        $this->assertDatabaseCount('media', 0);
    }

    public function test_deleting_media_removes_the_file(): void
    {
        Storage::fake('public');
        $path = UploadedFile::fake()->image('photo.png', 100, 100)->store('media', 'public');
        $media = Media::create(['title' => 'Photo', 'path' => $path]);
        $stored = $media->path;

        $media->delete();

        Storage::disk('public')->assertMissing($stored);
    }
}
