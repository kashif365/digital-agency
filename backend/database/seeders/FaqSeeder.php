<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            ['What services does a digital marketing agency provide?', 'A digital marketing agency plans and runs the online activity that helps people find and choose your business. That usually covers search engine optimization, paid advertising, social media, content, email, website design, and reporting. At {company}, we can handle a single channel or coordinate several under one strategy.'],
            ['How can SEO help my business?', 'SEO improves how visible your website is when people search for what you offer. Better technical health, useful content, and stronger relevance signals can bring in more visitors who are already looking for a solution. Because those visits are not paid for per click, SEO can become a dependable source of inquiries over time.'],
            ['What\'s the difference between SEO and paid advertising?', 'SEO earns unpaid visibility in search results and tends to build gradually. Paid advertising buys placement immediately, and traffic stops when the budget stops. Many businesses use paid campaigns for near-term demand while SEO builds longer-term visibility, and the data from each can improve the other.'],
            ['How long does it take to see digital marketing results?', 'It depends on the channel, your starting point, and your competition. Paid campaigns can generate traffic within days of launch, although they usually need time to optimize. SEO and content typically take several months to build momentum. We set realistic expectations during planning rather than promising fixed results or dates.'],
            ['Can you manage multiple marketing channels?', 'Yes. We can run search, paid media, social, content, and email together so that messaging, budgets, and reporting stay aligned. If you already have an internal team or other partners, we can also take on only the channels where you need support.'],
            ['Do I need a new website before starting marketing?', 'Not always. We review your current site first. If it loads quickly, works on mobile, and makes it easy to contact you, we can usually start marketing right away and improve it as we go. If it is holding your campaigns back, we will explain why and recommend the smallest change that solves the problem.'],
            ['How is marketing campaign performance measured?', 'We agree on the measures that matter to your business before launch, such as qualified inquiries, calls, form submissions, sales, or cost per lead. We then set up tracking and share regular reports that explain what happened, why it happened, and what we plan to do next.'],
            ['Do you guarantee results?', 'No, and you should be wary of anyone who does. Search engines and ad platforms control their own results, so no agency can promise a ranking or a fixed return. What we do commit to is a clear plan, honest reporting, and steady work on the things most likely to move your numbers.'],
            ['How do I get started with {company}?', 'Fill in the consultation form with a few details about your business and goals. A member of our team will review your request and follow up to talk through your priorities and the options that make sense.'],
        ];

        foreach ($faqs as $order => [$question, $answer]) {
            Faq::firstOrCreate(['question' => $question, 'service_id' => null], ['answer' => $answer, 'sort_order' => $order + 1]);
        }
    }
}
