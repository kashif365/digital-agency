<?php

namespace App\Filament\Support;

/** Every setting the admin can edit, and whether the public API may expose it. */
class SettingDefinitions
{
    public const PUBLIC = [
        'company.name', 'company.logo_media_id', 'company.banner_media_id', 'company.tagline', 'company.description',
        'contact.phone', 'contact.email', 'contact.address',
        'social.facebook', 'social.instagram', 'social.linkedin', 'social.x', 'social.youtube',
        'navigation.header', 'navigation.show_utility_bar',
        'footer.quick_links', 'footer.resources',
        'cta.header_label', 'cta.header_url',
        'seo.site_title', 'seo.title_template', 'seo.default_description', 'seo.default_og_media_id',
        'analytics.ga4_id', 'analytics.gtm_id',
        'forms.budget_ranges', 'forms.success_message',
    ];

    public const PRIVATE = ['notifications.lead_email'];

    public static function all(): array
    {
        return [...array_fill_keys(self::PUBLIC, true), ...array_fill_keys(self::PRIVATE, false)];
    }
}
