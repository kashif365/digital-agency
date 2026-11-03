<?php

$process = [
    ['title' => 'Discovery Call', 'text' => 'We talk through your business, customers, and goals, and look at your website, analytics, and current marketing before we recommend anything.', 'icon' => 'search'],
    ['title' => 'Plan and Proposal', 'text' => 'You receive a written plan: which services, in what order, the budget, and the numbers we will report on. Work starts once you have agreed it.', 'icon' => 'compass'],
    ['title' => 'Design and Build', 'text' => 'We produce the work, from website pages and campaigns to content and tracking, and you review each piece before it goes live.', 'icon' => 'rocket'],
    ['title' => 'Launch and Improve', 'text' => 'After launch we report on inquiries and sales, explain what changed, and agree the next improvements with you.', 'icon' => 'trending-up'],
];

$commitments = [
    ['title' => 'A separate plan for each channel', 'text' => 'One strategy shared by every channel'],
    ['title' => 'Reports full of clicks and impressions', 'text' => 'Reports that lead with inquiries and sales'],
    ['title' => 'Promises of guaranteed rankings', 'text' => 'Honest forecasts and plain advice'],
    ['title' => 'Ad accounts held by the agency', 'text' => 'Your accounts and data, in your name'],
    ['title' => 'Long contracts to lock you in', 'text' => 'Work tied to goals you agreed'],
];

$finalCta = ['cta_banner', [
    'heading' => 'Ready to Talk About Your Project?',
    'lead' => 'Tell us what you need, whether it is a new website, better search visibility, or a campaign. We will reply with honest advice on where to start.',
    'cta_label' => 'Get a Free Quote',
    'cta_url' => '/free-consultation',
]];

$nextSteps = [
    ['title' => 'We review your request', 'text' => 'Someone from our team reads your goals and takes a first look at your website and current marketing.', 'icon' => 'eye'],
    ['title' => 'We get in touch', 'text' => 'We reply by email or phone to arrange a call at a time that suits you.', 'icon' => 'mail'],
    ['title' => 'You get a clear proposal', 'text' => 'We recommend what to do first, explain the cost, and tell you honestly if we are not the right fit.', 'icon' => 'message-circle'],
];

return [
    [
        'slug' => 'home', 'title' => 'Home',
        'meta_title' => null,
        'meta_description' => '{company} is a digital marketing agency offering website design and development, SEO, paid advertising, social media, and branding for growing businesses.',
        'sections' => [
            ['hero', [
                'eyebrow' => 'Web Design, SEO and Digital Marketing',
                'heading' => 'Websites That Work Harder. Marketing That Brings Customers.',
                'lead' => 'We help businesses build professional websites, improve their visibility on Google, and run digital campaigns designed to reach the right customers.',
                'cta_label' => 'Discuss Your Project',
                'cta_url' => '#consultation',
                'secondary_cta_label' => 'Explore Our Work',
                'secondary_cta_url' => '/portfolio',
                'note' => 'Free consultation. No obligation.',
                'float_text' => 'Concept projects for fictional businesses',
                'items' => [
                    ['title' => 'Website design', 'text' => 'Hartwell Kitchens', 'icon' => 'monitor-smartphone', 'image_key' => 'concept-hartwell-home'],
                    ['title' => 'Landing page', 'text' => 'Fieldhouse Fitness', 'icon' => 'layout-template', 'image_key' => 'concept-fieldhouse-mobile'],
                    ['title' => 'Brand identity', 'text' => 'Morrow Coffee', 'icon' => 'palette', 'image_key' => 'concept-morrow-cover'],
                    ['title' => 'Social media', 'text' => 'Crumb & Co.', 'icon' => 'share-2', 'image_key' => 'concept-crumb'],
                ],
            ]],
            ['portfolio_grid', [
                'eyebrow' => 'Our Work',
                'heading' => 'Selected Work',
                'lead' => 'A closer look at the websites, campaigns, and brand work we create. These projects are concepts for fictional businesses, designed to show how we plan and present real work.',
                'cta_label' => 'View All Projects',
                'cta_url' => '/portfolio',
            ]],
            ['intro', [
                'eyebrow' => 'About {company}',
                'heading' => 'Your Website, Search Rankings, and Digital Campaigns, Handled by One Team',
                'image_key' => 'agency-sketching',
                'body' => '<p>{company} is a digital marketing agency for small and growing businesses. We design and build websites, improve how you appear on Google, and run advertising, social media, and email campaigns.</p><p>Because one team handles all of it, your website, search, and campaigns work toward the same goal: more inquiries from the right customers. You get one plan, one point of contact, and reports you can actually read.</p>',
                'cta_label' => 'About Us',
                'cta_url' => '/about-us',
                'secondary_cta_label' => 'Get a Free Quote',
                'secondary_cta_url' => '/free-consultation',
                'items' => [
                    ['title' => 'Websites built to convert', 'text' => 'Fast, mobile-friendly sites with clear calls to action.'],
                    ['title' => 'Search visibility', 'text' => 'SEO and local SEO so customers find you on Google.'],
                    ['title' => 'Campaigns that reach buyers', 'text' => 'Paid search, social, and email aimed at real prospects.'],
                    ['title' => 'Plain-language reporting', 'text' => 'Inquiries and sales first, with clear next steps.'],
                ],
            ]],
            ['services_grid', [
                'eyebrow' => 'What We Do',
                'heading' => 'Our Digital Marketing Services',
                'lead' => 'Choose a single service or combine several. Every engagement starts with what your business needs most.',
                'cta_label' => 'View All Services',
                'cta_url' => '/services',
            ]],
            ['process', [
                'eyebrow' => 'How We Work',
                'heading' => 'From First Call to Measurable Progress',
                'lead' => 'A simple, transparent process, so you always know what is happening and why.',
                'image_key' => 'agency-planning-wall',
                'items' => $process,
            ]],
            ['industries_grid', [
                'eyebrow' => 'Industries',
                'heading' => 'Industries We Work With',
                'lead' => 'Every sector has its own customers, buying cycles, and competition. Our plans start from that context.',
                'cta_label' => 'All Industries',
                'cta_url' => '/industries',
            ]],
            ['comparison', [
                'eyebrow' => 'Why {company}',
                'heading' => 'What You Can Expect When You Work With Us',
                'image_key' => 'agency-working-session',
                'cta_label' => 'Get a Free Quote',
                'cta_url' => '#consultation',
                'items' => $commitments,
            ]],
            ['testimonials', [
                'heading' => 'What Our Clients Say',
            ]],
            ['faqs', [
                'eyebrow' => 'FAQ',
                'heading' => 'Questions We Hear Most Often',
                'lead' => 'Straight answers about digital marketing and working with us. If yours is not here, ask it in the form below.',
            ]],
            ['blog_latest', [
                'eyebrow' => 'Insights',
                'heading' => 'Marketing Insights',
                'lead' => 'Practical guides on websites, search, and advertising for business owners.',
                'cta_label' => 'Read All Articles',
                'cta_url' => '/blog',
            ]],
            ['consultation_form', [
                'eyebrow' => 'Get a Free Quote',
                'heading' => 'Tell Us About Your Project',
                'lead' => 'Share a few details about your business and what you need. We review your website and current marketing before we speak, so the first call is useful.',
                'form_heading' => 'Request a free consultation',
                'form_cta' => 'Send My Request',
                'items' => $nextSteps,
            ]],
        ],
    ],
    [
        'slug' => 'about-us', 'title' => 'About Us',
        'meta_title' => 'About Us',
        'meta_description' => 'Learn about {company}, a digital marketing agency that handles websites, SEO, paid advertising, and social media for growing businesses under one plan.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'About Us',
                'heading' => 'A Digital Agency Built Around Clear Plans and Honest Reporting',
                'lead' => 'We help businesses replace scattered marketing with one plan they can understand, measure, and build on.',
                'cta_label' => 'Get a Free Quote',
                'cta_url' => '/free-consultation',
                'image_key' => 'agency-working-session',
            ]],
            ['intro', [
                'eyebrow' => 'What We Do',
                'heading' => 'Websites, Search, and Campaigns Under One Roof',
                'image_key' => 'agency-desk',
                'body' => '<p>{company} designs and builds websites, improves search visibility, and runs paid advertising, social media, and email campaigns. We also create brand identities and content for businesses that need them.</p><p>Our name comes from two ideas. An evergreen stays green through every season, and a grove grows stronger together. That is how we think marketing should work: steady rather than seasonal, with every channel supporting the others.</p>',
                'items' => [
                    ['title' => 'One team, one plan', 'text' => 'Your website, search, and campaigns are planned together, not by separate suppliers.'],
                    ['title' => 'Your accounts stay yours', 'text' => 'Ad accounts, analytics, and your website are set up in your name.'],
                    ['title' => 'Honest advice', 'text' => 'If a channel is not right for you yet, we will say so.'],
                    ['title' => 'Clear reporting', 'text' => 'Inquiries and sales come first, explained in plain language.'],
                ],
            ]],
            ['split', [
                'eyebrow' => 'Who We Work With',
                'heading' => 'Built for Small and Growing Businesses',
                'lead' => 'We work best with owners and marketing leads who want a dependable source of new customers and a partner who explains the work.',
                'image_key' => 'agency-sketching',
                'items' => [
                    ['title' => 'Local service businesses', 'text' => 'Trades, clinics, and studios that need to be found by nearby customers.'],
                    ['title' => 'E-commerce brands', 'text' => 'Online shops that want more qualified traffic and better conversion.'],
                    ['title' => 'Professional services', 'text' => 'Firms that win work through trust, expertise, and a credible website.'],
                    ['title' => 'Businesses relaunching', 'text' => 'Companies replacing an outdated website or brand and starting fresh.'],
                ],
            ]],
            ['value_grid', [
                'eyebrow' => 'How We Work',
                'heading' => 'How We Work With Clients',
                'items' => [
                    ['title' => 'Honest advice', 'text' => 'We recommend what suits your business, even when that means doing less, or doing it later.', 'icon' => 'shield-check'],
                    ['title' => 'Plain language', 'text' => 'You should never need a glossary to read our reports. We explain what we did, why, and what happens next.', 'icon' => 'message-circle'],
                    ['title' => 'Evidence first', 'text' => 'Research and performance data guide our decisions. When we are making an educated guess, we say so.', 'icon' => 'chart-column'],
                    ['title' => 'Shared goals', 'text' => 'We tie the work to outcomes your business cares about: inquiries, sales, and cost per customer.', 'icon' => 'target'],
                ],
            ]],
            ['process', [
                'eyebrow' => 'Our Process',
                'heading' => 'From First Call to Measurable Progress',
                'image_key' => 'agency-planning-wall',
                'items' => $process,
            ]],
            ['comparison', [
                'eyebrow' => 'Our Commitments',
                'heading' => 'What You Can Hold Us To',
                'items' => $commitments,
            ]],
            $finalCta,
        ],
    ],
    [
        'slug' => 'services', 'title' => 'Services',
        'meta_title' => 'Digital Marketing Services',
        'meta_description' => 'Website design and development, SEO, paid advertising, social media, content, branding, and email marketing from {company}.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Services',
                'heading' => 'Our Digital Marketing Services',
                'lead' => 'Websites, search, advertising, social media, and branding. Choose one service or combine several under a single plan.',
            ]],
            ['services_grid', ['show_all' => true]],
            $finalCta,
        ],
    ],
    [
        'slug' => 'industries', 'title' => 'Industries',
        'meta_title' => 'Industries We Serve',
        'meta_description' => 'Digital marketing shaped around the customers, buying cycles, and competition in your industry.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Industries',
                'heading' => 'Industries We Work With',
                'lead' => 'A family choosing a dentist and a company choosing a freight partner do not decide the same way. Our plans start from that difference.',
            ]],
            ['industries_grid', []],
            $finalCta,
        ],
    ],
    [
        'slug' => 'portfolio', 'title' => 'Our Work',
        'meta_title' => 'Our Work',
        'meta_description' => 'Website, SEO, campaign, social media, and branding projects from {company}, presented as concept work for fictional businesses.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Our Work',
                'heading' => 'Websites, Campaigns, and Brand Work',
                'lead' => 'Each project below is a concept for a fictional business, designed and documented the way we handle real client work.',
            ]],
            ['portfolio_grid', []],
            $finalCta,
        ],
    ],
    [
        'slug' => 'pricing', 'title' => 'Pricing',
        'meta_title' => 'Digital Marketing Pricing',
        'meta_description' => 'Clear starting points for digital marketing with {company}, from local SEO to a fully coordinated growth plan.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Pricing',
                'heading' => 'Simple Plans With Clear Starting Points',
                'lead' => 'Three ways to begin. We confirm the exact scope and cost with you after a free consultation, so you only pay for what your business needs.',
            ]],
            ['pricing', [
                'note' => 'Prices are starting points in US dollars. We confirm scope and cost in writing after your free consultation.',
            ]],
            ['faqs', [
                'eyebrow' => 'FAQ',
                'heading' => 'Before You Choose a Plan',
            ]],
            $finalCta,
        ],
    ],
    [
        'slug' => 'blog', 'title' => 'Blog',
        'meta_title' => 'Digital Marketing Blog',
        'meta_description' => 'Practical digital marketing advice on search, advertising, websites, and measurement from the {company} team.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Insights',
                'heading' => 'Marketing Insights',
                'lead' => 'Practical guides on websites, search, advertising, and measurement, written for business owners.',
            ]],
        ],
    ],
    [
        'slug' => 'contact-us', 'title' => 'Contact Us',
        'meta_title' => 'Contact Us',
        'meta_description' => 'Get in touch with {company} to talk about your website, search visibility, or marketing campaigns.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Contact Us',
                'heading' => 'Let\'s Talk About Your Project',
                'lead' => 'Send us a question or a brief, and a member of our team will reply.',
            ]],
            ['contact_form', [
                'heading' => 'Send Us a Message',
                'lead' => 'Questions about a service, a quote, or whether we are the right fit are all welcome.',
                'cta_label' => 'Send Message',
            ]],
        ],
    ],
    [
        'slug' => 'free-consultation', 'title' => 'Free Consultation',
        'meta_title' => 'Get a Free Quote',
        'meta_description' => 'Tell us about your project. {company} will review your website and marketing, then follow up with a clear recommendation and quote.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Get a Free Quote',
                'heading' => 'Tell Us About Your Project',
                'lead' => 'Share a few details about your business and what you need. There is no obligation and no hard sell.',
            ]],
            ['consultation_form', [
                'heading' => 'What Happens Next',
                'lead' => 'Here is what to expect after you send your request.',
                'form_heading' => 'Request a free consultation',
                'form_cta' => 'Send My Request',
                'items' => $nextSteps,
            ]],
        ],
    ],
    [
        'slug' => 'privacy-policy', 'title' => 'Privacy Policy',
        'meta_title' => 'Privacy Policy',
        'meta_description' => 'How {company} collects, uses, and protects the information you share through this website.',
        'sections' => [
            ['page_hero', ['eyebrow' => 'Legal', 'heading' => 'Privacy Policy']],
            ['rich_text', ['body' => '<p>This policy explains what information {company} collects through this website and how it is used.</p><h2>Information we collect</h2><p>When you submit a form on this website, we collect the details you provide, such as your name, business name, email address, phone number, website address, and your message. We also record technical information, including your IP address and browser details, to help protect the website from spam and abuse.</p><h2>How we use your information</h2><p>We use your information to respond to your inquiry, to provide the services you ask about, and to keep our website secure. We do not sell your personal information.</p><h2>Analytics and cookies</h2><p>If analytics tools are enabled on this website, they only load after you accept them in the cookie notice. They may use cookies or similar technologies to help us understand how the website is used. You can also control cookies through your browser settings.</p><h2>How long we keep information</h2><p>We keep inquiry records for as long as they are needed for the purposes above, or as required by law.</p><h2>Your rights</h2><p>Depending on where you live, you may have the right to access, correct, or delete your personal information. To make a request, please contact us using the details on our contact page.</p><h2>Changes to this policy</h2><p>We may update this policy from time to time. Any changes will be posted on this page.</p>']],
        ],
    ],
    [
        'slug' => 'terms-and-conditions', 'title' => 'Terms & Conditions',
        'meta_title' => 'Terms & Conditions',
        'meta_description' => 'The terms that apply when you use the {company} website.',
        'sections' => [
            ['page_hero', ['eyebrow' => 'Legal', 'heading' => 'Terms & Conditions']],
            ['rich_text', ['body' => '<p>These terms apply to your use of this website. By using the website, you agree to them.</p><h2>Use of this website</h2><p>You agree to use this website lawfully and not to interfere with its operation or security.</p><h2>Website content</h2><p>The content on this website is provided for general information only. It is not professional advice, and it does not guarantee any particular marketing outcome. Unless stated otherwise, the content belongs to {company} and may not be reused without permission.</p><h2>Services</h2><p>Submitting a form on this website does not create a contract. Any services are provided under a separate written agreement.</p><h2>Third-party links</h2><p>This website may link to websites run by others. We are not responsible for their content or their privacy practices.</p><h2>Limitation of liability</h2><p>To the extent permitted by law, {company} is not liable for any loss arising from your use of this website.</p><h2>Changes to these terms</h2><p>We may update these terms from time to time. Continued use of the website means you accept the updated terms.</p>']],
        ],
    ],
];
