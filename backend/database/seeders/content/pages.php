<?php

$process = [
    ['title' => 'Discover', 'text' => 'We learn about your business, customers, competitors, goals, and current marketing challenges.', 'icon' => 'search'],
    ['title' => 'Strategize', 'text' => 'We develop a practical digital marketing plan with clear priorities, channels, and success metrics.', 'icon' => 'compass'],
    ['title' => 'Launch', 'text' => 'Our team implements approved campaigns, creative assets, website improvements, and marketing activities.', 'icon' => 'rocket'],
    ['title' => 'Optimize', 'text' => 'We monitor performance, review insights, and make ongoing improvements to support stronger results.', 'icon' => 'chart-column'],
];

$finalCta = ['cta_banner', [
    'heading' => 'Ready to Take Your Digital Presence to the Next Level?',
    'lead' => 'Whether you need a stronger website, improved search visibility, better advertising campaigns, or a complete digital marketing strategy, we\'re ready to discuss the next steps for your business.',
    'cta_label' => 'Let\'s Talk About Your Project',
    'cta_url' => '/free-consultation',
]];

return [
    [
        'slug' => 'home', 'title' => 'Home',
        'meta_title' => null,
        'meta_description' => 'Targeted digital marketing strategies that attract the right audience, increase online visibility, and turn more website visitors into potential customers.',
        'sections' => [
            ['hero', [
                'eyebrow' => 'Digital Strategies That Turn Traffic Into Growth',
                'heading' => 'Grow Your Business With *Digital Marketing* That Delivers Results',
                'lead' => 'At {company}, we create targeted digital marketing strategies designed to attract the right audience, increase online visibility, and turn more website visitors into potential customers.',
                'cta_label' => 'Get Your Free Marketing Consultation',
                'cta_url' => '#consultation',
                'secondary_cta_label' => 'Explore Our Services',
                'secondary_cta_url' => '/services',
                'form_heading' => 'Let\'s Build Your *Next Growth Strategy*',
                'form_cta' => 'Request My Free Consultation',
                'image_key' => 'hero',
            ]],
            ['statement', [
                'eyebrow' => 'Your Digital Growth Partner',
                'heading' => 'One Agency. *Complete Digital Marketing* Solutions.',
                'body' => '<p>Building a strong digital presence requires more than simply running advertisements or publishing social media posts. It takes a coordinated strategy that connects your brand, audience, website, and marketing channels.</p><p>At {company}, we bring these elements together through research, thoughtful execution, and continuous optimization. Whether you\'re launching a new business or improving an established brand\'s online performance, our services are designed around your goals.</p>',
                'cta_label' => 'Discover Our Approach',
                'cta_url' => '/about-us',
            ]],
            ['testimonials', [
                'heading' => 'What Our Clients Say About Working With Us',
            ]],
            ['intro', [
                'eyebrow' => 'Why Choose Us',
                'heading' => 'Marketing Built Around *Your Business Goals*',
                'image_key' => 'about',
                'badge' => 'Your Growth Partner',
                'float_title' => 'Free Consultation',
                'float_text' => 'No obligation',
                'cta_label' => 'Get a Free Consultation',
                'cta_url' => '/free-consultation',
                'secondary_cta_label' => 'Our Services',
                'secondary_cta_url' => '/services',
                'items' => [
                    ['title' => 'Customized Strategies', 'text' => 'Marketing plans developed around your audience, industry, and business objectives.', 'icon' => 'target'],
                    ['title' => 'Data-Informed Decisions', 'text' => 'Campaign analysis and performance reporting to support informed optimization decisions.', 'icon' => 'chart-column'],
                    ['title' => 'Clear Communication', 'text' => 'Understand what we\'re working on, why it matters, and how your campaigns are progressing.', 'icon' => 'message-circle'],
                    ['title' => 'Creative Thinking', 'text' => 'Combine compelling visuals, relevant messaging, and practical marketing strategies.', 'icon' => 'lightbulb'],
                    ['title' => 'Continuous Improvement', 'text' => 'Review campaign performance and refine strategies based on meaningful results.', 'icon' => 'refresh-cw'],
                    ['title' => 'Long-Term Partnership', 'text' => 'Build a marketing approach that supports your business as your priorities and opportunities evolve.', 'icon' => 'handshake'],
                ],
            ]],
            ['dual_cta', [
                'items' => [
                    ['text' => 'Free Consultation', 'title' => 'Get the Right Marketing Plan for Your Business', 'cta_label' => 'Get Started', 'cta_url' => '/free-consultation'],
                    ['text' => 'Talk to Our Team', 'title' => 'Feel Free to Contact Us for Additional Info', 'cta_label' => 'Contact Us', 'cta_url' => '/contact-us'],
                ],
            ]],
            ['process', [
                'eyebrow' => 'Our Working Process',
                'heading' => 'From Your First Consultation to Continuous Growth',
                'items' => $process,
            ]],
            ['services_grid', [
                'eyebrow' => 'Our Digital Marketing Services',
                'heading' => 'Everything You Need to Grow Your Business Online',
                'cta_label' => 'View All Services',
                'cta_url' => '/services',
            ]],
            ['industries_grid', [
                'eyebrow' => 'Industries We Serve',
                'heading' => 'Digital Marketing Solutions for Different Industries',
            ]],
            ['split', [
                'eyebrow' => '3 Simple Steps to Getting Started',
                'lead' => 'Working with us starts with a straightforward conversation about your business.',
                'image_key' => 'split-one',
                'items' => [
                    ['title' => 'Request a Consultation', 'text' => 'Tell us about your business, your goals, and what you have tried so far.'],
                    ['title' => 'Review Your Options', 'text' => 'We follow up to talk through your priorities and the services that make sense.'],
                    ['title' => 'Start With a Clear Plan', 'text' => 'Once you approve a plan, our team gets to work and keeps you updated.'],
                ],
            ]],
            ['split', [
                'eyebrow' => 'Marketing Without the Guesswork',
                'lead' => 'Good marketing should be easy to understand, whichever channels you use.',
                'image_key' => 'split-two',
                'reverse' => true,
                'items' => [
                    ['title' => 'Clear Priorities', 'text' => 'Every piece of work connects to a goal you have agreed with us.'],
                    ['title' => 'One Coordinated Plan', 'text' => 'Your website, search, advertising, and social channels work to the same strategy.'],
                    ['title' => 'Reporting You Can Read', 'text' => 'You see what changed, why it matters, and what happens next.'],
                ],
            ]],
            ['portfolio_grid', [
                'eyebrow' => 'Our Work',
                'heading' => 'Explore Our Work and *Marketing Projects*',
                'cta_label' => 'View All Projects',
                'cta_url' => '/portfolio',
            ]],
            ['faqs', [
                'heading' => '*Frequently* Asked Questions',
                'lead' => 'Answers to common questions about digital marketing and working with us.',
            ]],
            ['blog_latest', [
                'eyebrow' => 'Blog & Resources',
                'heading' => 'Digital Marketing Insights, Strategies & Resources',
                'cta_label' => 'Read the Blog',
                'cta_url' => '/blog',
            ]],
            $finalCta,
        ],
    ],
    [
        'slug' => 'about-us', 'title' => 'About Us',
        'meta_title' => 'About Us',
        'meta_description' => 'Learn how {company} combines market research, creative execution, and performance analysis to support measurable business growth.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'About {company}',
                'heading' => 'A Digital Marketing Partner Focused on Your Goals',
                'lead' => 'We help businesses strengthen their online presence through strategy, creative work, and careful measurement.',
                'cta_label' => 'Get a Free Consultation',
                'cta_url' => '/free-consultation',
            ]],
            ['intro', [
                'eyebrow' => 'Who We Are',
                'heading' => 'Marketing That Connects Every Part of *Your Online Presence*',
                'image_key' => 'about',
                'badge' => 'Your Growth Partner',
                'float_title' => 'Free Consultation',
                'float_text' => 'No obligation',
                'body' => '<p>{company} helps businesses strengthen their online presence through strategic digital marketing, search engine optimization, paid advertising, website development, and conversion-focused campaigns.</p><p>Our approach combines market research, creative execution, and performance analysis to help businesses connect with the right audience, generate qualified inquiries, and pursue measurable growth.</p>',
            ]],
            ['value_grid', [
                'eyebrow' => 'What Guides Us',
                'heading' => 'How We Approach Every Engagement',
                'items' => [
                    ['title' => 'Honest Advice', 'text' => 'We recommend what we believe suits your business, including when that means doing less.', 'icon' => 'shield-check'],
                    ['title' => 'Plain Language', 'text' => 'We explain what we are doing and why, without hiding behind marketing jargon.', 'icon' => 'message-circle'],
                    ['title' => 'Evidence First', 'text' => 'We use research and performance data to guide our decisions.', 'icon' => 'chart-column'],
                    ['title' => 'Shared Goals', 'text' => 'We tie our work to the outcomes your business actually cares about.', 'icon' => 'target'],
                ],
            ]],
            ['process', [
                'eyebrow' => 'How We Work',
                'heading' => 'From Your First Consultation to Continuous Growth',
                'items' => $process,
            ]],
            $finalCta,
        ],
    ],
    [
        'slug' => 'services', 'title' => 'Services',
        'meta_title' => 'Digital Marketing Services',
        'meta_description' => 'Explore SEO, paid advertising, social media, content, web design, email, and analytics services from {company}.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Our Services',
                'heading' => 'Digital Marketing Services for Every Stage of Growth',
                'lead' => 'Choose a single service or combine several under one coordinated strategy.',
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
                'heading' => 'Marketing Shaped Around How Your Customers Buy',
                'lead' => 'Every sector has its own audiences, buying cycles, and competition. Our plans start from that context.',
            ]],
            ['industries_grid', []],
            $finalCta,
        ],
    ],
    [
        'slug' => 'portfolio', 'title' => 'Our Work',
        'meta_title' => 'Our Work',
        'meta_description' => 'Explore the kinds of digital marketing projects and deliverables {company} creates.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Our Work',
                'heading' => 'Explore Our Work and Marketing Projects',
                'lead' => 'A look at how we plan and deliver digital marketing projects.',
            ]],
            ['portfolio_grid', []],
            $finalCta,
        ],
    ],
    [
        'slug' => 'blog', 'title' => 'Blog',
        'meta_title' => 'Digital Marketing Blog',
        'meta_description' => 'Practical digital marketing insights, strategies, and resources from the {company} team.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Blog & Resources',
                'heading' => 'Digital Marketing Insights, Strategies & Resources',
                'lead' => 'Practical guidance on search, advertising, websites, and getting more from your marketing.',
            ]],
        ],
    ],
    [
        'slug' => 'contact-us', 'title' => 'Contact Us',
        'meta_title' => 'Contact Us',
        'meta_description' => 'Get in touch with {company} to talk about your website, marketing channels, and growth goals.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Contact Us',
                'heading' => 'Let\'s Talk About Your Business',
                'lead' => 'Send us a message and a member of our team will get back to you.',
            ]],
            ['contact_form', [
                'heading' => 'Send Us a Message',
                'lead' => 'Have a question about our services? Use this form and tell us how we can help.',
                'cta_label' => 'Send Message',
            ]],
        ],
    ],
    [
        'slug' => 'free-consultation', 'title' => 'Free Consultation',
        'meta_title' => 'Free Marketing Consultation',
        'meta_description' => 'Tell us about your business and goals. {company} will review your request and follow up to discuss your options.',
        'sections' => [
            ['page_hero', [
                'eyebrow' => 'Free Consultation',
                'heading' => 'Let\'s Build Your Next Growth Strategy',
                'lead' => 'Share a few details about your business and what you want to achieve.',
            ]],
            ['consultation_form', [
                'heading' => 'What Happens Next',
                'lead' => 'There is no obligation. Here is what to expect after you send your request.',
                'form_heading' => 'Tell Us About Your Business',
                'form_cta' => 'Request My Free Consultation',
                'items' => [
                    ['title' => 'We review your request', 'text' => 'A member of our team reads through your goals and your current website.', 'icon' => 'eye'],
                    ['title' => 'We get in touch', 'text' => 'We follow up by email or phone to arrange a conversation at a suitable time.', 'icon' => 'mail'],
                    ['title' => 'We discuss your options', 'text' => 'We talk through your priorities and which services would make sense.', 'icon' => 'message-circle'],
                ],
            ]],
        ],
    ],
    [
        'slug' => 'privacy-policy', 'title' => 'Privacy Policy',
        'meta_title' => 'Privacy Policy',
        'meta_description' => 'How {company} collects, uses, and protects the information you share through this website.',
        'sections' => [
            ['page_hero', ['eyebrow' => 'Legal', 'heading' => 'Privacy Policy']],
            ['rich_text', ['body' => '<p>This policy explains what information {company} collects through this website and how it is used.</p><h2>Information we collect</h2><p>When you submit a form on this website, we collect the details you provide, such as your name, business name, email address, phone number, website address, and your message. We also record technical information, including your IP address and browser details, to help protect the website from spam and abuse.</p><h2>How we use your information</h2><p>We use your information to respond to your inquiry, to provide the services you ask about, and to keep our website secure. We do not sell your personal information.</p><h2>Analytics and cookies</h2><p>If analytics tools are enabled on this website, they may use cookies or similar technologies to help us understand how the website is used. You can control cookies through your browser settings.</p><h2>How long we keep information</h2><p>We keep inquiry records for as long as they are needed for the purposes above, or as required by law.</p><h2>Your rights</h2><p>Depending on where you live, you may have the right to access, correct, or delete your personal information. To make a request, please contact us using the details on our contact page.</p><h2>Changes to this policy</h2><p>We may update this policy from time to time. Any changes will be posted on this page.</p>']],
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
