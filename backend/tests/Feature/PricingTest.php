<?php

namespace Tests\Feature;

use App\Enums\ContentStatus;
use App\Models\Media;
use App\Models\Page;
use App\Models\PricingPlan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PricingTest extends TestCase
{
    use RefreshDatabase;

    private function plan(array $attributes = []): PricingPlan
    {
        return PricingPlan::create([
            'name' => 'Growth',
            'price' => 'From $2,499',
            'period' => 'per month',
            'features' => ['Monthly strategy call'],
            'status' => ContentStatus::Published,
            ...$attributes,
        ]);
    }

    public function test_only_published_plans_are_listed_in_order(): void
    {
        $this->plan(['name' => 'Second', 'sort_order' => 2]);
        $this->plan(['name' => 'First', 'sort_order' => 1, 'is_recommended' => true]);
        $this->plan(['name' => 'Hidden', 'status' => ContentStatus::Draft]);

        $this->getJson('/api/v1/pricing')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.name', 'First')
            ->assertJsonPath('data.0.is_recommended', true)
            ->assertJsonPath('data.0.features.0', 'Monthly strategy call');
    }

    public function test_the_company_token_works_in_plan_text(): void
    {
        \App\Models\WebsiteSetting::put('company.name', 'Evergrove', true);
        $this->plan(['description' => 'Built by {company}.']);

        $this->getJson('/api/v1/pricing')->assertJsonPath('data.0.description', 'Built by Evergrove.');
    }

    public function test_section_items_can_carry_their_own_image(): void
    {
        $media = Media::withoutEvents(fn () => Media::create(['title' => 'Slide', 'alt_text' => 'A slide', 'path' => 'media/slide.webp']));
        $page = Page::create(['title' => 'Home', 'slug' => 'home', 'status' => ContentStatus::Published]);
        $page->sections()->create(['type' => 'hero', 'data' => ['items' => [['title' => 'Search', 'media_id' => $media->id], ['title' => 'Paid']]]]);

        $this->getJson('/api/v1/pages/home')
            ->assertJsonPath('data.sections.0.data.items.0.image.alt', 'A slide')
            ->assertJsonPath('data.sections.0.data.items.1.image', null)
            ->assertJsonMissingPath('data.sections.0.data.items.0.media_id');
    }
}
