<?php

namespace Tests\Feature;

use App\Enums\ContentStatus;
use App\Models\Media;
use App\Models\Portfolio;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioCaseStudyTest extends TestCase
{
    use RefreshDatabase;

    private function media(string $title): Media
    {
        return Media::withoutEvents(fn () => Media::create(['title' => $title, 'alt_text' => "$title alt", 'path' => "media/$title.webp", 'width' => 1440, 'height' => 900]));
    }

    private function project(array $attributes = []): Portfolio
    {
        return Portfolio::create([
            'title' => 'Shop website',
            'slug' => 'shop-website',
            'status' => ContentStatus::Published,
            'website_url' => 'https://client.example',
            'completed_on' => '2026-09-01',
            'deliverables' => [['title' => 'Homepage', 'text' => 'Design and build']],
            ...$attributes,
        ]);
    }

    public function test_a_case_study_returns_its_gallery_in_order(): void
    {
        $desktop = $this->media('desktop');
        $phone = $this->media('phone');
        $this->project(['gallery' => [
            ['media_id' => $phone->id, 'kind' => 'mobile', 'caption' => 'On a phone'],
            ['media_id' => 999, 'kind' => 'desktop', 'caption' => 'Deleted image'],
            ['media_id' => $desktop->id, 'kind' => 'desktop', 'caption' => 'Homepage'],
        ]]);

        $this->getJson('/api/v1/portfolio/shop-website')
            ->assertOk()
            ->assertJsonCount(2, 'data.gallery')
            ->assertJsonPath('data.gallery.0.kind', 'mobile')
            ->assertJsonPath('data.gallery.0.image.alt', 'phone alt')
            ->assertJsonPath('data.gallery.1.caption', 'Homepage')
            ->assertJsonPath('data.deliverables.0.title', 'Homepage')
            ->assertJsonPath('data.completed_on', '2026-09-01');
    }

    public function test_real_work_links_to_the_live_site(): void
    {
        $this->project();

        $this->getJson('/api/v1/portfolio/shop-website')->assertJsonPath('data.website_url', 'https://client.example');
    }

    public function test_a_concept_never_links_to_a_live_site(): void
    {
        $this->project(['is_illustrative' => true]);

        $this->getJson('/api/v1/portfolio/shop-website')->assertJsonPath('data.website_url', null);
    }
}
