<?php

namespace Database\Seeders;

use App\Filament\Support\SettingDefinitions;
use App\Models\WebsiteSetting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'company.name' => config('agency.seed.company_name'),
            'company.logo_media_id' => null,
            'company.banner_media_id' => null,
            'company.tagline' => 'Marketing that keeps growing',
            'company.description' => '{company} is a digital marketing agency that connects search, paid media, content, and your website into one plan built to bring in more of the right customers.',
            'contact.phone' => null,
            'contact.email' => null,
            'contact.address' => null,
            'social.facebook' => null,
            'social.instagram' => null,
            'social.linkedin' => null,
            'social.x' => null,
            'social.youtube' => null,
            'navigation.header' => [
                ['label' => 'Services', 'url' => '/services'],
                ['label' => 'Industries', 'url' => '/industries'],
                ['label' => 'Our Work', 'url' => '/portfolio'],
                ['label' => 'About', 'url' => '/about-us'],
                ['label' => 'Blog', 'url' => '/blog'],
            ],
            'navigation.show_utility_bar' => false,
            'footer.quick_links' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'About Us', 'url' => '/about-us'],
                ['label' => 'Our Work', 'url' => '/portfolio'],
                ['label' => 'Contact Us', 'url' => '/contact-us'],
            ],
            'footer.resources' => [
                ['label' => 'Blog', 'url' => '/blog'],
                ['label' => 'Industries', 'url' => '/industries'],
                ['label' => 'All Services', 'url' => '/services'],
                ['label' => 'Free Consultation', 'url' => '/free-consultation'],
            ],
            'cta.header_label' => 'Free consultation',
            'cta.header_url' => '/free-consultation',
            'seo.site_title' => '{company} | Digital Marketing Agency',
            'seo.title_template' => '%s | {company}',
            'seo.default_description' => '{company} is a digital marketing agency that connects your SEO, paid media, content, and website into one plan built to bring in more of the right customers.',
            'seo.default_og_media_id' => null,
            'analytics.ga4_id' => null,
            'analytics.gtm_id' => null,
            'forms.budget_ranges' => ['Under $1,000 per month', '$1,000 to $2,500 per month', '$2,500 to $5,000 per month', '$5,000 to $10,000 per month', 'Over $10,000 per month', 'Not sure yet'],
            'forms.success_message' => 'Thank you. We have your request, and a member of our team will be in touch to talk through the next steps.',
            'notifications.lead_email' => null,
        ];

        foreach (SettingDefinitions::all() as $key => $isPublic) {
            WebsiteSetting::firstOrCreate(['key' => $key], ['value' => $defaults[$key] ?? null, 'is_public' => $isPublic]);
        }
    }
}
