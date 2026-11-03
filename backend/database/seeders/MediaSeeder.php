<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Adds the starter images to the media library, where editors can replace them.
 * Sources and licences for every file are listed in images/ASSETS.md.
 */
class MediaSeeder extends Seeder
{
    /** Stock photos from the first release. Kept for the blog. */
    public const FOLDER = 'starter';

    /** Licensed CC0 photography for services, industries, and agency sections. */
    public const STOCK = 'stock';

    /** Screenshots of Evergrove's concept projects for fictional businesses. */
    public const CONCEPTS = 'concepts';

    /** key => [file, title, alt text, folder] */
    public const IMAGES = [
        'hero' => ['hero.jpg', 'Team strategy session', 'A marketing team discussing a campaign in a bright office', self::FOLDER],
        'about' => ['about.jpg', 'Team conversation', 'Colleagues talking together in an office', self::FOLDER],
        'split-one' => ['split-one.jpg', 'Reviewing a plan', 'Three colleagues reviewing work on a laptop', self::FOLDER],
        'split-two' => ['split-two.jpg', 'Planning on paper', 'Two people planning at a desk with laptops', self::FOLDER],
        'work-website' => ['work-website.jpg', 'Overhead team meeting', 'A team around a table seen from above', self::FOLDER],
        'work-roadmap' => ['work-roadmap.jpg', 'Roadmap discussion', 'Two colleagues discussing a plan at a laptop', self::FOLDER],
        'work-campaign' => ['work-campaign.jpg', 'Campaign review', 'A team reviewing a campaign plan together', self::FOLDER],
        'work-landing' => ['work-landing.jpg', 'Landing page working session', 'A team working around a table with laptops', self::FOLDER],
        'work-social' => ['work-social.jpg', 'Video content tiles', 'Letter tiles spelling vlog on a wooden table', self::FOLDER],
        'work-brand' => ['work-brand.jpg', 'Boardroom portrait', 'A person seated at a boardroom table', self::FOLDER],
        'blog-seo-ppc' => ['blog-seo-ppc.jpg', 'Research notes', 'People taking notes beside a laptop', self::FOLDER],
        'blog-strategy' => ['blog-strategy.jpg', 'Strategy workshop', 'People working through sticky notes at a table', self::FOLDER],
        'blog-website' => ['blog-website.jpg', 'Laptop on a desk', 'A laptop on a wooden desk', self::FOLDER],
        'blog-local' => ['blog-local.jpg', 'Local planning meeting', 'A small team in a planning meeting', self::FOLDER],
        'blog-measure' => ['blog-measure.jpg', 'Performance review', 'A team reviewing results together in a meeting room', self::FOLDER],
        'blog-social' => ['blog-social.jpg', 'Content creator tiles', 'Letter tiles spelling content creator', self::FOLDER],

        'service-seo' => ['stock/service-seo.jpg', 'Search performance on a laptop', 'A laptop showing a line chart of website traffic', self::STOCK],
        'service-local-seo' => ['stock/service-local-seo.jpg', 'Searching on a phone outdoors', 'A hand holding a smartphone on a city street', self::STOCK],
        'service-technical-seo' => ['stock/service-technical-seo.jpg', 'Website source code', 'HTML code on a dark editor screen', self::STOCK],
        'service-ppc' => ['stock/service-ppc.jpg', 'Campaign dashboard on a laptop', 'A laptop showing an analytics dashboard on a dark desk', self::STOCK],
        'service-social-marketing' => ['stock/service-social-marketing.jpg', 'Scrolling social media', 'A hand holding a smartphone over a cafe table', self::STOCK],
        'service-social-management' => ['stock/service-social-management.jpg', 'Managing posts on a phone', 'Hands holding a phone above a laptop keyboard', self::STOCK],
        'service-content' => ['stock/service-content.jpg', 'Writing content', 'A person writing in a notebook beside a laptop and coffee', self::STOCK],
        'service-video' => ['stock/service-video.jpg', 'Filming video content', 'A videographer filming with a professional camera', self::STOCK],
        'service-web' => ['stock/service-web.jpg', 'Designing a website', 'Hands on a laptop beside printed website wireframes', self::STOCK],
        'service-landing' => ['stock/service-landing.jpg', 'Landing page wireframe', 'A hand-drawn page wireframe in a notebook', self::STOCK],
        'service-branding' => ['stock/service-branding.jpg', 'Colour swatches', 'A fan of printed colour swatches', self::STOCK],
        'service-email' => ['stock/service-email.jpg', 'Working on email campaigns', 'A laptop on a tidy desk beside a plant', self::STOCK],
        'service-cro' => ['stock/service-cro.jpg', 'Reviewing conversion reports', 'Hands pointing at printed charts on a desk', self::STOCK],
        'service-analytics' => ['stock/service-analytics.jpg', 'Analytics dashboard', 'A desktop computer showing a performance dashboard', self::STOCK],
        'agency-planning-wall' => ['stock/agency-planning-wall.jpg', 'Weekly planning board', 'A whiteboard with a week-by-week plan in sticky notes', self::STOCK],
        'agency-working-session' => ['stock/agency-working-session.jpg', 'Working session', 'Hands taking notes beside laptops during a working session', self::STOCK],
        'agency-sketching' => ['stock/agency-sketching.jpg', 'Sketching ideas', 'Overhead view of hands sketching layouts beside a phone', self::STOCK],
        'agency-desk' => ['stock/agency-desk.jpg', 'Desk with laptop', 'Overhead view of a person working on a laptop', self::STOCK],
        'industry-healthcare' => ['stock/industry-healthcare.jpg', 'Treatment room', 'A clean, modern dental treatment room', self::STOCK],
        'industry-real-estate' => ['stock/industry-real-estate.jpg', 'Apartment building', 'A modern apartment building in sunlight', self::STOCK],
        'industry-ecommerce' => ['stock/industry-ecommerce.jpg', 'Packing orders', 'A person packing boxes for shipping', self::STOCK],
        'industry-automotive' => ['stock/industry-automotive.jpg', 'Vintage car showroom', 'An illustration of a lit car showroom at night', self::STOCK],
        'industry-logistics' => ['stock/industry-logistics.jpg', 'Container port', 'An aerial view of shipping containers at a port', self::STOCK],
        'industry-professional' => ['stock/industry-professional.jpg', 'Reviewing documents', 'Hands reviewing a document at a desk', self::STOCK],
        'industry-home-services' => ['stock/industry-home-services.jpg', 'Plans and tools', 'Building plans on a workbench with hand tools', self::STOCK],
        'industry-education' => ['stock/industry-education.jpg', 'Study notes', 'An open textbook and notebook with a pen', self::STOCK],

        'concept-hartwell-home' => ['concepts/hartwell-kitchens-home.jpg', 'Hartwell Kitchens concept: homepage', 'Concept homepage for a fictional kitchen fitter, with a kitchen photo and a booking button', self::CONCEPTS],
        'concept-hartwell-full' => ['concepts/hartwell-kitchens-full.jpg', 'Hartwell Kitchens concept: full page', 'Full-length concept homepage showing services, process, service areas, and a quote form', self::CONCEPTS],
        'concept-hartwell-mobile' => ['concepts/hartwell-kitchens-mobile.jpg', 'Hartwell Kitchens concept: mobile', 'The kitchen fitter concept homepage on a phone', self::CONCEPTS],
        'concept-northgate-cover' => ['concepts/northgate-dental-roadmap-cover.jpg', 'Northgate Dental concept: roadmap cover', 'Cover and summary of a concept search roadmap for a fictional dental practice', self::CONCEPTS],
        'concept-northgate-full' => ['concepts/northgate-dental-roadmap.jpg', 'Northgate Dental concept: full roadmap', 'Concept roadmap with a keyword map, search snippet rewrite, and twelve-week plan', self::CONCEPTS],
        'concept-northgate-mobile' => ['concepts/northgate-dental-roadmap-mobile.jpg', 'Northgate Dental concept: roadmap on mobile', 'The concept search roadmap on a phone', self::CONCEPTS],
        'concept-fieldhouse-home' => ['concepts/fieldhouse-landing-home.jpg', 'Fieldhouse Fitness concept: landing page', 'Concept landing page for a fictional gym offer, with a booking form', self::CONCEPTS],
        'concept-fieldhouse-full' => ['concepts/fieldhouse-landing-full.jpg', 'Fieldhouse Fitness concept: full landing page', 'Full-length concept landing page with offer, steps, questions, and a final call to action', self::CONCEPTS],
        'concept-fieldhouse-mobile' => ['concepts/fieldhouse-landing-mobile.jpg', 'Fieldhouse Fitness concept: mobile landing page', 'The gym landing page concept on a phone', self::CONCEPTS],
        'concept-fieldhouse-campaign' => ['concepts/fieldhouse-campaign-creatives.jpg', 'Fieldhouse Fitness concept: campaign creatives', 'Concept search ad, social ads, story ad, and welcome email for one gym offer', self::CONCEPTS],
        'concept-crumb' => ['concepts/crumb-and-co-social-plan.jpg', 'Crumb & Co. concept: social plan', 'Concept social profile grid and monthly content calendar for a fictional bakery', self::CONCEPTS],
        'concept-morrow' => ['concepts/morrow-coffee-brand.jpg', 'Morrow Coffee concept: brand sheet', 'Concept brand identity with logo, colours, typography, packaging, and stationery', self::CONCEPTS],
        'concept-morrow-cover' => ['concepts/morrow-coffee-brand-cover.jpg', 'Morrow Coffee concept: logo and palette', 'Concept logo, photography, colours, and typography for a fictional coffee roaster', self::CONCEPTS],
    ];

    public function run(): void
    {
        foreach (self::IMAGES as [$file, $title, $alt, $folder]) {
            if (Media::where('folder', $folder)->where('title', $title)->exists()) {
                continue;
            }

            $path = 'media/'.Str::random(32).'.jpg';
            Storage::disk('public')->put($path, (string) file_get_contents(__DIR__.'/images/'.$file));

            Media::create(['title' => $title, 'alt_text' => $alt, 'folder' => $folder, 'path' => $path]);
        }
    }

    public static function id(string $key): ?int
    {
        [, $title, , $folder] = self::IMAGES[$key];

        return Media::where('folder', $folder)->where('title', $title)->value('id');
    }
}
