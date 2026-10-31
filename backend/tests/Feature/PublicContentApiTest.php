<?php

namespace Tests\Feature;

use App\Enums\ContentStatus;
use App\Models\BlogPost;
use App\Models\Faq;
use App\Models\Industry;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Redirect;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\Testimonial;
use App\Models\WebsiteSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicContentApiTest extends TestCase
{
    use RefreshDatabase;

    private function service(array $attributes = []): Service
    {
        $category = ServiceCategory::firstOrCreate(['slug' => 'search'], ['name' => 'Search']);

        return Service::create([
            'service_category_id' => $category->id,
            'title' => 'SEO',
            'slug' => 'seo',
            'short_description' => 'Search work.',
            'status' => ContentStatus::Published,
            ...$attributes,
        ]);
    }

    public function test_only_published_services_are_listed(): void
    {
        $this->service();
        $this->service(['slug' => 'draft-service', 'status' => ContentStatus::Draft]);

        $this->getJson('/api/v1/services')->assertOk()->assertJsonCount(1, 'data')->assertJsonPath('data.0.slug', 'seo');
        $this->getJson('/api/v1/services/draft-service')->assertNotFound();
    }

    public function test_featured_services_follow_their_homepage_order(): void
    {
        $this->service(['slug' => 'second', 'is_featured' => true, 'featured_order' => 2, 'sort_order' => 1]);
        $this->service(['slug' => 'first', 'is_featured' => true, 'featured_order' => 1, 'sort_order' => 2]);
        $this->service(['slug' => 'not-featured']);

        $this->getJson('/api/v1/services?featured=1')
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.slug', 'first');
    }

    public function test_a_service_page_includes_its_sections_and_related_services(): void
    {
        $service = $this->service(['audience' => [['title' => 'Owners', 'text' => 'Local owners']]]);
        $this->service(['slug' => 'ppc', 'title' => 'PPC']);
        Faq::create(['service_id' => $service->id, 'question' => 'Q?', 'answer' => 'A.']);

        $this->getJson('/api/v1/services/seo')
            ->assertOk()
            ->assertJsonPath('data.audience.0.title', 'Owners')
            ->assertJsonPath('data.faqs.0.question', 'Q?')
            ->assertJsonPath('data.related.0.slug', 'ppc');
    }

    public function test_scheduled_posts_stay_hidden_until_their_time(): void
    {
        BlogPost::create(['title' => 'Later', 'slug' => 'later', 'body' => '<p>Soon</p>', 'status' => ContentStatus::Scheduled, 'published_at' => now()->addDay()]);
        BlogPost::create(['title' => 'Draft', 'slug' => 'draft', 'body' => '<p>No</p>', 'status' => ContentStatus::Draft, 'published_at' => now()->subDay()]);

        $this->getJson('/api/v1/blog')->assertJsonCount(0, 'data');
        $this->getJson('/api/v1/blog/later')->assertNotFound();

        $this->travel(2)->days();

        $this->getJson('/api/v1/blog')->assertJsonCount(1, 'data');
        $this->getJson('/api/v1/blog/later')->assertOk();
    }

    public function test_a_post_published_without_a_date_goes_live_immediately(): void
    {
        BlogPost::create(['title' => 'Now', 'slug' => 'now', 'body' => '<p>x</p>', 'status' => ContentStatus::Published]);

        $this->getJson('/api/v1/blog/now')->assertOk();
    }

    public function test_the_blog_can_be_filtered_by_category(): void
    {
        $category = \App\Models\BlogCategory::create(['name' => 'SEO', 'slug' => 'seo']);
        BlogPost::create(['title' => 'In', 'slug' => 'in', 'body' => '<p>x</p>', 'blog_category_id' => $category->id, 'status' => ContentStatus::Published, 'published_at' => now()->subHour()]);
        BlogPost::create(['title' => 'Out', 'slug' => 'out', 'body' => '<p>x</p>', 'status' => ContentStatus::Published, 'published_at' => now()->subHour()]);

        $this->getJson('/api/v1/blog?category=seo')->assertJsonCount(1, 'data')->assertJsonPath('data.0.slug', 'in');
    }

    public function test_unapproved_testimonials_are_never_returned(): void
    {
        Testimonial::create(['customer_name' => 'Pending', 'body' => 'Great', 'is_approved' => false]);

        $this->getJson('/api/v1/testimonials')->assertOk()->assertJsonCount(0, 'data');

        Testimonial::create(['customer_name' => 'Approved', 'body' => 'Great', 'is_approved' => true]);

        $this->getJson('/api/v1/testimonials')->assertJsonCount(1, 'data')->assertJsonPath('data.0.customer_name', 'Approved');
    }

    public function test_unverified_outcomes_are_withheld(): void
    {
        Portfolio::create(['title' => 'Work', 'slug' => 'work', 'outcomes' => '<p>Doubled sales</p>', 'status' => ContentStatus::Published]);

        $this->getJson('/api/v1/portfolio/work')->assertOk()->assertJsonPath('data.outcomes', null);

        Portfolio::where('slug', 'work')->update(['outcomes_verified' => true]);

        $this->getJson('/api/v1/portfolio/work')->assertJsonPath('data.outcomes', '<p>Doubled sales</p>');
    }

    public function test_illustrative_work_is_labelled_and_drops_out_once_real_work_exists(): void
    {
        Portfolio::create(['title' => 'Sample', 'slug' => 'sample', 'is_illustrative' => true, 'status' => ContentStatus::Published]);

        $this->getJson('/api/v1/portfolio')
            ->assertJsonPath('meta.illustrative_only', true)
            ->assertJsonPath('data.0.is_illustrative', true);
        $this->getJson('/api/v1/portfolio/sample')->assertJsonPath('data.seo.noindex', true);

        Portfolio::create(['title' => 'Real', 'slug' => 'real', 'status' => ContentStatus::Published]);

        $this->getJson('/api/v1/portfolio')
            ->assertJsonPath('meta.illustrative_only', false)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'real');
    }

    public function test_an_industry_without_a_page_has_a_card_but_no_detail_route(): void
    {
        Industry::create(['name' => 'Retail', 'slug' => 'retail', 'short_description' => 'x', 'has_page' => false, 'status' => ContentStatus::Published]);

        $this->getJson('/api/v1/industries')->assertJsonPath('data.0.has_page', false);
        $this->getJson('/api/v1/industries/retail')->assertNotFound();
    }

    public function test_public_settings_never_expose_private_rows(): void
    {
        WebsiteSetting::put('company.name', 'Acme', true);
        WebsiteSetting::put('notifications.lead_email', 'secret@example.com', false);

        $this->getJson('/api/v1/settings/public')
            ->assertOk()
            ->assertJsonPath('data.company.name', 'Acme')
            ->assertJsonMissingPath('data.notifications')
            ->assertDontSee('secret@example.com');
    }

    public function test_the_company_token_is_replaced_and_escaped(): void
    {
        WebsiteSetting::put('company.name', 'Ann "A" Co ', true);

        $page = Page::create(['title' => 'About', 'slug' => 'about', 'status' => ContentStatus::Published]);
        $page->sections()->create(['type' => 'rich_text', 'data' => ['heading' => 'About {company}']]);

        $this->getJson('/api/v1/pages/about')->assertJsonPath('data.sections.0.data.heading', 'About Ann "A" Co');
    }

    public function test_hidden_sections_and_unpublished_pages_are_not_served(): void
    {
        $page = Page::create(['title' => 'About', 'slug' => 'about', 'status' => ContentStatus::Published]);
        $page->sections()->create(['type' => 'rich_text', 'data' => ['heading' => 'Shown']]);
        $page->sections()->create(['type' => 'rich_text', 'data' => ['heading' => 'Hidden'], 'is_visible' => false]);
        Page::create(['title' => 'Secret', 'slug' => 'secret', 'status' => ContentStatus::Draft]);

        $this->getJson('/api/v1/pages/about')->assertJsonCount(1, 'data.sections');
        $this->getJson('/api/v1/pages/secret')->assertNotFound();
    }

    public function test_the_sitemap_lists_indexable_content_only(): void
    {
        $this->service();
        $this->service(['slug' => 'hidden'])->seo()->create(['noindex' => true]);
        Page::create(['title' => 'Home', 'slug' => 'home', 'status' => ContentStatus::Published]);
        Portfolio::create(['title' => 'Sample', 'slug' => 'sample', 'is_illustrative' => true, 'status' => ContentStatus::Published]);

        $paths = collect($this->getJson('/api/v1/sitemap')->assertOk()->json('data'))->pluck('path');

        $this->assertContains('/', $paths);
        $this->assertContains('/services/seo', $paths);
        $this->assertNotContains('/services/hidden', $paths);
        $this->assertNotContains('/portfolio/sample', $paths);
    }

    public function test_only_active_redirects_are_served(): void
    {
        Redirect::create(['from_path' => '/old', 'to_path' => '/new']);
        Redirect::create(['from_path' => '/off', 'to_path' => '/new', 'is_active' => false]);

        $this->getJson('/api/v1/redirects')->assertJsonCount(1, 'data')->assertJsonPath('data.0.from_path', '/old');
    }

    public function test_cross_origin_requests_are_limited_to_the_frontend(): void
    {
        config(['cors.allowed_origins' => ['https://site.example']]);

        // The header always names the one allowed origin, so a browser on any other origin rejects it.
        foreach (['https://evil.example', 'https://site.example'] as $origin) {
            $this->withHeaders(['Origin' => $origin])->getJson('/api/v1/faqs')
                ->assertHeader('Access-Control-Allow-Origin', 'https://site.example');
        }
    }
}
