<?php

namespace App\Models;

use App\Models\Concerns\RevalidatesFrontend;
use App\Support\HtmlCleaner;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageSection extends Model
{
    use RevalidatesFrontend;

    /** Layouts the frontend knows how to render. */
    public const TYPES = [
        'hero' => 'Homepage hero',
        'page_hero' => 'Page header',
        'statement' => 'Statement with supporting points',
        'intro' => 'Story with feature list',
        'dual_cta' => 'Two call-to-action cards',
        'split' => 'Image with numbered steps',
        'services_grid' => 'Services by category',
        'value_grid' => 'Value propositions',
        'process' => 'Numbered process',
        'comparison' => 'Before and after comparison',
        'industries_grid' => 'Industries grid',
        'portfolio_grid' => 'Portfolio grid',
        'testimonials' => 'Testimonials carousel',
        'pricing' => 'Pricing plans',
        'cta_banner' => 'Call-to-action banner',
        'faqs' => 'FAQ accordion',
        'blog_latest' => 'Latest blog articles',
        'rich_text' => 'Rich text',
        'consultation_form' => 'Consultation form',
        'contact_form' => 'Contact form and details',
    ];

    protected $fillable = ['page_id', 'type', 'data', 'sort_order', 'is_visible'];

    protected function casts(): array
    {
        return ['data' => 'array', 'is_visible' => 'boolean'];
    }

    protected static function booted(): void
    {
        static::saving(function (PageSection $section) {
            $data = $section->data ?? [];

            if (isset($data['body'])) {
                $data['body'] = app(HtmlCleaner::class)->clean($data['body']);
                $section->data = $data;
            }
        });
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}
