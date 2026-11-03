<?php

/*
 * Concept projects for fictional businesses. They show the kind of work Evergrove
 * produces, are labelled as concepts everywhere, and claim no clients or results.
 * Their designs live in design/concepts/ at the repository root.
 */

return [
    [
        'slug' => 'sample-local-service-website',
        'title' => 'Hartwell Kitchens Website',
        'industry' => 'home-services',
        'summary' => 'A concept website for a fictional kitchen fitter, built to explain the offer quickly and turn local visitors into home-visit bookings.',
        'overview' => '<p>Hartwell Kitchens is a fictional kitchen design and fitting business serving a group of nearby towns. We designed its website the way we would for a real local trade: one clear offer, honest proof of how the work is done, and a booking form within reach on every screen.</p>',
        'challenges' => '<p>Local trade websites often hide the details people need to make a decision: which areas they cover, what is included, and how pricing works. Many are hard to use on a phone, which is where most local searches start. The brief was a site that answers those questions in the first scroll and makes booking a home visit the obvious next step.</p>',
        'strategy' => '<p>We led with a plain statement of the service and three reasons to trust the business, then organised the page around the questions customers ask: what you do, how it works, where you cover, and how to get a quote. Service areas get their own section so the site can support local search. The quote form repeats at the end, and the mobile layout puts the booking button first.</p>',
        'deliverables' => [
            ['Homepage design', 'Offer, services, process, service areas, and a quote form in one page.'],
            ['Mobile layout', 'A phone-first version with booking in the first screen.'],
            ['Local search structure', 'Service-area content and headings planned around local searches.'],
            ['Quote request form', 'Short form with the details a fitter needs before calling back.'],
        ],
        'services' => ['website-design-development', 'local-seo'],
        'image' => 'concept-hartwell-home',
        'gallery' => [
            ['concept-hartwell-full', 'desktop', 'The full homepage, from the offer to the quote form'],
            ['concept-hartwell-mobile', 'mobile', 'The same page on a phone'],
        ],
    ],
    [
        'slug' => 'sample-search-visibility-roadmap',
        'title' => 'Northgate Dental Search Roadmap',
        'industry' => 'healthcare-wellness',
        'summary' => 'A concept SEO audit and twelve-week roadmap for a fictional dental practice, showing how we turn research into a plan a practice can act on.',
        'overview' => '<p>Northgate Dental is a fictional practice that wants more nearby patients to find it for specific treatments. This sample shows the format of the search roadmap we hand over at the end of an audit: what to fix first, which page should answer each type of search, and a phased plan.</p>',
        'challenges' => '<p>Without a roadmap, SEO becomes a list of disconnected tasks, and a busy practice has no way to tell which ones matter. Treatments such as implants or emergency care often share one general page, so none of them can rank on its own.</p>',
        'strategy' => '<p>The roadmap opens with the three highest-impact fixes, then maps each search theme to the page that should answer it and marks whether that page exists. A snippet rewrite shows how the homepage would appear in results before and after. Work is phased over twelve weeks, starting with technical fixes and the business profile, then new treatment pages and patient guides.</p>',
        'deliverables' => [
            ['Priority summary', 'The three fixes most likely to make a difference, in plain language.'],
            ['Keyword map', 'Search themes matched to the page that should rank, with status and priority.'],
            ['Search snippet rewrites', 'Titles and descriptions that give searchers a reason to click.'],
            ['Twelve-week roadmap', 'A phased plan the practice can follow and review against.'],
        ],
        'services' => ['search-engine-optimization', 'technical-seo', 'local-seo'],
        'image' => 'concept-northgate-cover',
        'gallery' => [
            ['concept-northgate-full', 'detail', 'The full roadmap: summary, keyword map, snippet rewrite, and plan'],
            ['concept-northgate-mobile', 'mobile', 'The roadmap is readable on a phone, so it gets read'],
        ],
    ],
    [
        'slug' => 'sample-multi-channel-campaign',
        'title' => 'Fieldhouse Fitness January Campaign',
        'industry' => 'healthcare-wellness',
        'summary' => 'A concept campaign for a fictional gym, with search ads, social creatives, a story ad, and a welcome email all built around one offer.',
        'overview' => '<p>Fieldhouse Fitness is a fictional small-group gym running a January trial offer. This sample shows how we plan a campaign across channels so every ad, post, and email carries the same message and points to the same landing page.</p>',
        'challenges' => '<p>When each channel is planned separately, the offer drifts: one ad mentions a discount, another a free class, and the email says something else again. Budgets compete, and nobody can compare results.</p>',
        'strategy' => '<p>We fixed one audience and one offer first, then adapted the message for each placement: a search ad for people already looking for a gym, feed and story ads to reach people who are not, and a welcome email that confirms the booking. Every piece links to a single landing page with one form.</p>',
        'deliverables' => [
            ['Search ad copy', 'Headline, description, and sitelinks matched to the offer.'],
            ['Social ad creatives', 'Photo and text feed posts, plus a vertical story ad.'],
            ['Welcome email', 'Confirms the booking and sets expectations for the first visit.'],
            ['Shared landing page', 'One page and one form for every channel.'],
        ],
        'services' => ['pay-per-click-advertising', 'social-media-marketing', 'email-marketing'],
        'image' => 'concept-fieldhouse-campaign',
        'gallery' => [
            ['concept-fieldhouse-campaign', 'detail', 'Search ad, social feed posts, story ad, and welcome email'],
            ['concept-fieldhouse-home', 'desktop', 'The landing page every ad points to'],
        ],
    ],
    [
        'slug' => 'sample-landing-page-concept',
        'title' => 'Fieldhouse Fitness Landing Page',
        'industry' => 'healthcare-wellness',
        'summary' => 'A concept landing page for a fictional gym offer: one promise, one audience, and one form, designed to match the ads that send people there.',
        'overview' => '<p>This is the landing page behind the Fieldhouse Fitness concept campaign. It shows how we structure a page for paid traffic, from the headline that repeats the ad to a single clear action.</p>',
        'challenges' => '<p>Sending ad traffic to a general homepage asks visitors to find their own way. Competing links and vague messages make it easy to leave without acting, and the ad spend is wasted.</p>',
        'strategy' => '<p>The page repeats the offer from the ad in its headline, lists exactly what is included, and puts the booking form beside it. Below, it explains how the trial works in three steps and answers the questions that stop people booking. There is no main navigation to wander off through.</p>',
        'deliverables' => [
            ['Landing page design', 'Desktop and mobile layouts for one offer.'],
            ['Conversion copy', 'Headline, benefits, steps, and answers to common objections.'],
            ['Booking form', 'Four fields, with expectations set beside the button.'],
        ],
        'services' => ['landing-page-design', 'pay-per-click-advertising'],
        'image' => 'concept-fieldhouse-home',
        'gallery' => [
            ['concept-fieldhouse-full', 'desktop', 'The full landing page'],
            ['concept-fieldhouse-mobile', 'mobile', 'On a phone, the offer and form come first'],
        ],
    ],
    [
        'slug' => 'sample-social-content-plan',
        'title' => 'Crumb & Co. Social Content Plan',
        'industry' => null,
        'summary' => 'A concept social media plan for a fictional bakery: four recurring themes, a month of scheduled posts, and a profile grid that looks like the shop.',
        'overview' => '<p>Crumb &amp; Co. is a fictional neighbourhood bakery. This sample shows the format of a monthly social plan: agreed themes, planned formats, and a preview of how the profile will look once the month is posted.</p>',
        'challenges' => '<p>Small businesses tend to post in bursts when they have time, and the tone changes from post to post. Without a plan, nobody can say what the activity is meant to achieve.</p>',
        'strategy' => '<p>We set four themes that rotate through the month, each tied to one of two actions: visit the shop or order a cake. Posts are planned three weeks ahead and approved in one review, and the profile grid is designed so photos and text posts alternate.</p>',
        'deliverables' => [
            ['Content themes', 'Four recurring themes with a clear purpose for each.'],
            ['Monthly calendar', 'Posts, reels, stories, and polls planned by day.'],
            ['Profile grid design', 'Text-post templates that sit well beside photography.'],
        ],
        'services' => ['social-media-management', 'content-marketing'],
        'image' => 'concept-crumb',
        'gallery' => [
            ['concept-crumb', 'detail', 'Profile grid preview beside the October content calendar'],
        ],
    ],
    [
        'slug' => 'sample-brand-refresh',
        'title' => 'Morrow Coffee Brand Identity',
        'industry' => null,
        'summary' => 'A concept brand identity for a fictional coffee roaster, with a logo, colour palette, typography, packaging, and stationery that work together.',
        'overview' => '<p>Morrow Coffee Roasters is a fictional small-batch roaster. This sample shows the scope of a brand identity project and how the pieces are presented in a single brand sheet a team can apply with confidence.</p>',
        'challenges' => '<p>Growing businesses often end up with a logo made in a hurry and colours chosen differently for every new bag, menu, or post. The result looks less established than the business really is.</p>',
        'strategy' => '<p>The identity starts from one idea, first light, and carries it through a simple sunrise mark, a warm terracotta against deep night blue, and a pairing of a bold sans serif with an italic serif for origins and tasting notes. Packaging and stationery show the system in use.</p>',
        'deliverables' => [
            ['Logo and mark', 'Primary logo and a standalone symbol for small spaces.'],
            ['Colour and type', 'A four-colour palette and a two-typeface system.'],
            ['Packaging', 'A coffee bag design that adapts to each origin.'],
            ['Stationery', 'Business cards and contact details.'],
        ],
        'services' => ['branding-graphic-design'],
        'image' => 'concept-morrow-cover',
        'gallery' => [
            ['concept-morrow', 'detail', 'The brand sheet: logo, photography, colour, type, packaging, and stationery'],
        ],
    ],
];
