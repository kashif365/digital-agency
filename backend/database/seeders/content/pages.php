<?php

$process = [
    ['title' => 'Discover', 'text' => 'We learn your business, customers, and competitors, then audit what your marketing is doing today.', 'icon' => 'search'],
    ['title' => 'Plan', 'text' => 'You get one clear plan with priorities, channels, and the numbers we will be judged on.', 'icon' => 'compass'],
    ['title' => 'Launch', 'text' => 'We build and launch the approved work across your website, search, ads, and content.', 'icon' => 'rocket'],
    ['title' => 'Improve', 'text' => 'We review the results with you, keep what works, and change what does not.', 'icon' => 'trending-up'],
];

$finalCta = ['cta_banner', [
    'heading' => 'Ready for marketing that *keeps growing*?',
    'lead' => 'Tell us where your business is today and where you want it to go. We will show you where we would start.',
    'cta_label' => 'Get a free consultation',
    'cta_url' => '/free-consultation',
]];

$nextSteps = [
    ['title' => 'We review your request', 'text' => 'A strategist reads your goals and takes a first look at your website and current marketing.', 'icon' => 'eye'],
    ['title' => 'We get in touch', 'text' => 'We follow up by email or phone to arrange a conversation at a time that suits you.', 'icon' => 'mail'],
    ['title' => 'You get straight answers', 'text' => 'We talk through your priorities, what we would do first, and whether we are the right fit.', 'icon' => 'message-circle'],
];

return [
    [
        'slug' => 'home', 'title' => 'Home',
        'meta_title' => null,
        'meta_description' => '{company} is a digital marketing agency that connects your SEO, paid media, content, and website into one plan built to bring in more of the right customers.',
        'sections' => [
            ['hero', [
                'eyebrow' => 'Digital marketing agency',
                'heading' => 'Turn scattered marketing into a system that *keeps growing*',
                'lead' => '{company} connects your search, paid media, content, and website into one plan, so every channel works toward the same goal: more of the right customers.',
                'cta_label' => 'Get a free consultation',
                'cta_url' => '#consultation',
                'secondary_cta_label' => 'See how we work',
                'secondary_cta_url' => '#process',
                'badge' => 'Your growth system',
                'float_title' => 'One shared plan',
                'float_text' => 'More qualified inquiries',
                'items' => [
                    ['title' => 'Search', 'text' => 'Get found', 'icon' => 'search'],
                    ['title' => 'Paid media', 'text' => 'Reach buyers', 'icon' => 'mouse-pointer-click'],
                    ['title' => 'Social & content', 'text' => 'Earn trust', 'icon' => 'share-2'],
                    ['title' => 'Website & email', 'text' => 'Convert', 'icon' => 'monitor-smartphone'],
                ],
            ]],
            ['statement', [
                'eyebrow' => 'The problem',
                'heading' => 'Most marketing does not fail. It *drifts apart*.',
                'body' => '<p>Ads run in one place, SEO in another, and the website has not changed in two years. Everyone reports their own numbers, and nobody can say what is actually bringing in customers.</p>',
                'items' => [
                    ['title' => 'Channels that never connect', 'text' => 'Search, ads, and social each have their own message, budget, and report.', 'icon' => 'layers'],
                    ['title' => 'Reports that say very little', 'text' => 'Clicks and impressions go up, but nobody can tie them to inquiries or sales.', 'icon' => 'chart-column'],
                    ['title' => 'A website that leaks', 'text' => 'Hard-won traffic lands on pages that were never built to turn visitors into leads.', 'icon' => 'gauge'],
                ],
            ]],
            ['services_grid', [
                'eyebrow' => 'What we do',
                'heading' => 'One team across *every channel that matters*',
                'lead' => 'Start with a single service or bring them all together. Either way, it runs from the same plan.',
                'cta_label' => 'View all services',
                'cta_url' => '/services',
            ]],
            ['process', [
                'eyebrow' => 'How we work',
                'heading' => 'A simple way of working, *repeated every month*',
                'lead' => 'Good marketing is not a launch. It is a loop that gets sharper each time around.',
                'items' => $process,
            ]],
            ['comparison', [
                'eyebrow' => 'Why {company}',
                'heading' => 'What changes when your marketing has *one owner*',
                'cta_label' => 'Get a free consultation',
                'cta_url' => '#consultation',
                'items' => [
                    ['title' => 'A separate plan for each channel', 'text' => 'One strategy across every channel'],
                    ['title' => 'Reports full of clicks and impressions', 'text' => 'Reports built around inquiries and sales'],
                    ['title' => 'Promises of guaranteed rankings', 'text' => 'Honest forecasts and plain advice'],
                    ['title' => 'Accounts held by the agency', 'text' => 'Your ad accounts and data stay yours'],
                    ['title' => 'Busywork to fill a retainer', 'text' => 'Work tied to a goal you agreed'],
                ],
            ]],
            ['portfolio_grid', [
                'eyebrow' => 'Sample work',
                'heading' => 'A closer look at *how we plan the work*',
                'cta_label' => 'See all samples',
                'cta_url' => '/portfolio',
            ]],
            ['industries_grid', [
                'eyebrow' => 'Industries',
                'heading' => 'Marketing shaped around *how your customers buy*',
                'lead' => 'Every sector has its own audiences, buying cycles, and competition. Our plans start from that context.',
            ]],
            ['testimonials', [
                'heading' => 'What clients say about working with us',
            ]],
            ['faqs', [
                'eyebrow' => 'FAQ',
                'heading' => 'Questions we hear *most often*',
                'lead' => 'Straight answers about digital marketing and working with us.',
            ]],
            ['blog_latest', [
                'eyebrow' => 'Insights',
                'heading' => 'Practical marketing advice, *without the jargon*',
                'cta_label' => 'Read the blog',
                'cta_url' => '/blog',
            ]],
            ['consultation_form', [
                'eyebrow' => 'Free consultation',
                'heading' => 'Find out what is *holding your growth back*',
                'lead' => 'Tell us where you are today. There is no obligation and no hard sell.',
                'form_heading' => 'Tell us about your business',
                'form_cta' => 'Request my free consultation',
                'items' => $nextSteps,
            ]],
        ],
    ],
    [
        'slug' => 'about-us', 'title' => 'About Us',
        'meta_title' => 'About Us',
        'meta_description' => 'Meet {company}, a digital marketing agency that connects strategy, creative, and measurement so your marketing keeps improving.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'About {company}',
                'heading' => 'Named after things that *keep growing*',
                'lead' => 'We help businesses replace disconnected marketing activity with one plan they can understand, measure, and build on.',
                'cta_label' => 'Get a free consultation',
                'cta_url' => '/free-consultation',
            ]],
            ['intro', [
                'eyebrow' => 'Our story',
                'heading' => 'Why we are called *{company}*',
                'badge' => 'Our idea',
                'float_title' => 'Stronger together',
                'float_text' => 'Every channel supports the next',
                'body' => '<p>An evergreen stays green all year. A grove is a group of trees that grow stronger together. That is how we think marketing should work: steady through every season, with each channel supporting the others.</p><p>{company} brings search, paid media, content, and your website under one strategy. We combine market research, creative work, and careful measurement to help you reach the right audience and earn more qualified inquiries.</p>',
            ]],
            ['value_grid', [
                'eyebrow' => 'What guides us',
                'heading' => 'How we approach every engagement',
                'items' => [
                    ['title' => 'Honest advice', 'text' => 'We recommend what suits your business, even when that means doing less.', 'icon' => 'shield-check'],
                    ['title' => 'Plain language', 'text' => 'We explain what we are doing and why, without hiding behind jargon.', 'icon' => 'message-circle'],
                    ['title' => 'Evidence first', 'text' => 'Research and performance data guide our decisions, not habit or fashion.', 'icon' => 'chart-column'],
                    ['title' => 'Shared goals', 'text' => 'We tie our work to the outcomes your business actually cares about.', 'icon' => 'target'],
                ],
            ]],
            ['process', [
                'eyebrow' => 'How we work',
                'heading' => 'A simple way of working, *repeated every month*',
                'items' => $process,
            ]],
            $finalCta,
        ],
    ],
    [
        'slug' => 'services', 'title' => 'Services',
        'meta_title' => 'Digital Marketing Services',
        'meta_description' => 'SEO, paid advertising, social media, content, web design, email, and analytics from {company}, all run from one plan.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Services',
                'heading' => 'Everything your marketing needs, *under one plan*',
                'lead' => 'Choose a single service or combine several. Every engagement starts with what your business needs most.',
            ]],
            ['services_grid', ['show_all' => true]],
            $finalCta,
        ],
    ],
    [
        'slug' => 'industries', 'title' => 'Industries',
        'meta_title' => 'Industries We Serve',
        'meta_description' => 'Digital marketing shaped around the audiences, buying cycles, and competition in your industry.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Industries',
                'heading' => 'Marketing shaped around *how your customers buy*',
                'lead' => 'Every sector has its own audiences, buying cycles, and competition. Our plans start from that context.',
            ]],
            ['industries_grid', []],
            $finalCta,
        ],
    ],
    [
        'slug' => 'portfolio', 'title' => 'Our Work',
        'meta_title' => 'Our Work',
        'meta_description' => 'Illustrative examples of the digital marketing plans and deliverables {company} creates.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Our work',
                'heading' => 'See *how we plan the work*',
                'lead' => 'These samples show the structure and thinking you can expect from a {company} engagement.',
            ]],
            ['portfolio_grid', []],
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
                'heading' => 'Practical marketing advice, *without the jargon*',
                'lead' => 'Guidance on search, advertising, websites, and getting more from your marketing.',
            ]],
        ],
    ],
    [
        'slug' => 'contact-us', 'title' => 'Contact Us',
        'meta_title' => 'Contact Us',
        'meta_description' => 'Get in touch with {company} to talk about your website, marketing channels, and growth goals.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Contact',
                'heading' => 'Let\'s talk about *your business*',
                'lead' => 'Send us a message and a member of our team will get back to you.',
            ]],
            ['contact_form', [
                'heading' => 'Send us a message',
                'lead' => 'Have a question about our services? Use this form and tell us how we can help. If you already know you want a plan, a free consultation is the quickest route.',
                'cta_label' => 'Send message',
            ]],
        ],
    ],
    [
        'slug' => 'free-consultation', 'title' => 'Free Consultation',
        'meta_title' => 'Free Marketing Consultation',
        'meta_description' => 'Tell us about your business and goals. {company} will review your request and follow up with straight answers on where to start.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Free consultation',
                'heading' => 'Find out what is *holding your growth back*',
                'lead' => 'Share a few details about your business and what you want to achieve.',
            ]],
            ['consultation_form', [
                'heading' => 'What happens next',
                'lead' => 'There is no obligation and no hard sell. Here is what to expect after you send your request.',
                'form_heading' => 'Tell us about your business',
                'form_cta' => 'Request my free consultation',
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
