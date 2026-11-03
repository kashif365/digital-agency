<?php

namespace Tests\Feature;

use App\Enums\ContentStatus;
use App\Models\Media;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\WebsiteSetting;
use App\Support\ImageOptimizer;
use Database\Seeders\MediaSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RefreshStarterContentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // The media options copy starter images onto the public disk. Re-encoding them is
        // covered elsewhere, so the optimizer keeps each file as it is here.
        Storage::fake('public');
        $this->mock(ImageOptimizer::class)->allows('optimize')->andReturnUsing(
            fn (string $disk, string $path) => ['path' => $path, 'mime_type' => 'image/jpeg', 'size' => 1, 'width' => 1440, 'height' => 900]
        );
    }

    public function test_it_replaces_only_the_requested_pages(): void
    {
        $about = Page::create(['title' => 'About Us', 'slug' => 'about-us', 'status' => ContentStatus::Published, 'is_system' => true]);
        $about->sections()->create(['type' => 'rich_text', 'data' => ['body' => '<p>Old copy</p>']]);
        $contact = Page::create(['title' => 'Contact Us', 'slug' => 'contact-us', 'status' => ContentStatus::Published, 'is_system' => true]);
        $contact->sections()->create(['type' => 'rich_text', 'data' => ['body' => '<p>Keep me</p>']]);

        $this->artisan('content:refresh', ['--page' => ['about-us'], '--force' => true])->assertSuccessful();

        $this->assertSame('page_hero', $about->sections()->orderBy('sort_order')->first()->type);
        $this->assertSame(['rich_text'], $contact->sections()->pluck('type')->all());
    }

    public function test_it_rejects_unknown_pages(): void
    {
        $this->artisan('content:refresh', ['--page' => ['nope'], '--force' => true])->assertFailed();
    }

    public function test_it_does_nothing_without_confirmation(): void
    {
        $page = Page::create(['title' => 'Home', 'slug' => 'home', 'status' => ContentStatus::Published]);
        $page->sections()->create(['type' => 'rich_text', 'data' => ['body' => '<p>Mine</p>']]);

        $this->artisan('content:refresh', ['--page' => ['home']])->expectsConfirmation('Continue?', 'no')->assertFailed();

        $this->assertSame(1, $page->sections()->count());
    }

    public function test_service_summaries_are_opt_in(): void
    {
        $category = ServiceCategory::create(['name' => 'Search', 'slug' => 'search']);
        $service = Service::create(['service_category_id' => $category->id, 'title' => 'SEO', 'slug' => 'search-engine-optimization', 'short_description' => 'Old summary', 'hero_heading' => 'Old Heading', 'status' => ContentStatus::Published]);

        $this->artisan('content:refresh', ['--page' => ['home'], '--force' => true])->assertSuccessful();
        $this->assertSame('Old summary', $service->fresh()->short_description);

        $this->artisan('content:refresh', ['--page' => ['home'], '--services' => true, '--force' => true])->assertSuccessful();
        $this->assertStringStartsWith('Research, technical fixes', $service->fresh()->short_description);
        $this->assertStringContainsString('*find you*', $service->fresh()->hero_heading);
    }

    public function test_navigation_and_starter_photo_removal_are_opt_in(): void
    {
        WebsiteSetting::put('navigation.header', [['label' => 'Old', 'url' => '/old']], true);
        $photo = Media::withoutEvents(fn () => Media::create(['title' => 'Stock', 'alt_text' => 'Stock', 'folder' => MediaSeeder::FOLDER, 'path' => 'media/stock.webp']));
        $sample = Portfolio::create(['title' => 'Sample', 'slug' => 'sample', 'is_illustrative' => true, 'featured_media_id' => $photo->id, 'status' => ContentStatus::Published]);
        WebsiteSetting::put('company.banner_media_id', $photo->id, true);

        $this->artisan('content:refresh', ['--page' => ['home'], '--force' => true])->assertSuccessful();
        $this->assertSame('Old', WebsiteSetting::value('navigation.header')[0]['label']);
        $this->assertSame($photo->id, $sample->fresh()->featured_media_id);

        $this->artisan('content:refresh', ['--page' => ['home'], '--navigation' => true, '--photos' => true, '--force' => true])->assertSuccessful();
        $this->assertSame('Home', WebsiteSetting::value('navigation.header')[0]['label']);
        $this->assertNull($sample->fresh()->featured_media_id);
        $this->assertNull(WebsiteSetting::value('company.banner_media_id'));
    }

    public function test_a_real_banner_photo_is_kept(): void
    {
        $photo = Media::withoutEvents(fn () => Media::create(['title' => 'Our studio', 'alt_text' => 'Studio', 'folder' => 'general', 'path' => 'media/studio.webp']));
        WebsiteSetting::put('company.banner_media_id', $photo->id, true);

        $this->artisan('content:refresh', ['--page' => ['home'], '--photos' => true, '--force' => true])->assertSuccessful();

        $this->assertSame($photo->id, WebsiteSetting::value('company.banner_media_id'));
    }

    public function test_portfolio_refresh_rewrites_concepts_but_never_real_work(): void
    {
        $concept = Portfolio::create(['title' => 'Old sample', 'slug' => 'sample-brand-refresh', 'is_illustrative' => true, 'status' => ContentStatus::Published]);
        $real = Portfolio::create(['title' => 'Client site', 'slug' => 'sample-local-service-website', 'is_illustrative' => false, 'status' => ContentStatus::Published]);

        $this->artisan('content:refresh', ['--page' => ['home'], '--portfolio' => true, '--force' => true])->assertSuccessful();

        $this->assertSame('Morrow Coffee Brand Identity', $concept->fresh()->title);
        $this->assertNotEmpty($concept->fresh()->deliverables);
        $this->assertSame('Client site', $real->fresh()->title);
        $this->assertTrue(Portfolio::where('slug', 'sample-search-visibility-roadmap')->where('is_illustrative', true)->exists());
    }

    public function test_images_are_only_added_where_none_exists(): void
    {
        $category = ServiceCategory::create(['name' => 'Search', 'slug' => 'search']);
        $own = Media::withoutEvents(fn () => Media::create(['title' => 'Ours', 'alt_text' => 'Ours', 'path' => 'media/ours.webp']));
        $mine = Service::create(['service_category_id' => $category->id, 'title' => 'SEO', 'slug' => 'search-engine-optimization', 'short_description' => 'Search', 'featured_media_id' => $own->id, 'status' => ContentStatus::Published]);
        $bare = Service::create(['service_category_id' => $category->id, 'title' => 'Local', 'slug' => 'local-seo', 'short_description' => 'Local', 'status' => ContentStatus::Published]);

        $this->artisan('content:refresh', ['--page' => ['home'], '--images' => true, '--force' => true])->assertSuccessful();

        $this->assertSame($own->id, $mine->fresh()->featured_media_id);
        $this->assertNotNull($bare->fresh()->featured_media_id);
    }
}
