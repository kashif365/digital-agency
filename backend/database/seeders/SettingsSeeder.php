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
            'company.banner_media_id' => MediaSeeder::id('banner'),
            'company.tagline' => 'Digital Strategies That Turn Traffic Into Growth',
            'company.description' => '{company} helps businesses strengthen their online presence through strategic digital marketing, search engine optimization, paid advertising, website development, and conversion-focused campaigns.',
            'contact.phone' => null,
            'contact.email' => null,
            'contact.address' => null,
            'social.facebook' => null,
            'social.instagram' => null,
            'social.linkedin' => null,
            'social.x' => null,
            'social.youtube' => null,
            'navigation.header' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'About Us', 'url' => '/about-us'],
                ['label' => 'Services', 'url' => '/services'],
                ['label' => 'Industries', 'url' => '/industries'],
                ['label' => 'Our Work', 'url' => '/portfolio'],
                ['label' => 'Blog', 'url' => '/blog'],
                ['label' => 'Contact Us', 'url' => '/contact-us'],
            ],
            'navigation.show_utility_bar' => true,
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
            'cta.header_label' => 'Get a Free Consultation',
            'cta.header_url' => '/free-consultation',
            'seo.site_title' => '{company} | Digital Marketing Agency',
            'seo.title_template' => '%s | {company}',
            'seo.default_description' => 'Targeted digital marketing strategies that attract the right audience, increase online visibility, and turn more website visitors into potential customers.',
            'seo.default_og_media_id' => null,
            'analytics.ga4_id' => null,
            'analytics.gtm_id' => null,
            'forms.budget_ranges' => ['Under $1,000 per month', '$1,000 to $2,500 per month', '$2,500 to $5,000 per month', '$5,000 to $10,000 per month', 'Over $10,000 per month', 'Not sure yet'],
            'forms.success_message' => 'Thank you. We have received your request and a member of our team will be in touch to discuss the next steps.',
            'notifications.lead_email' => null,
        ];

        foreach (SettingDefinitions::all() as $key => $isPublic) {
            WebsiteSetting::firstOrCreate(['key' => $key], ['value' => $defaults[$key] ?? null, 'is_public' => $isPublic]);
        }
    }
}
