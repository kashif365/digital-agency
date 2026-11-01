<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\PricingPlan;
use Illuminate\Database\Seeder;

/** Starter plans. The prices are placeholders to replace with the business's real rates. */
class PricingSeeder extends Seeder
{
    private const PLANS = [
        [
            'name' => 'Starter',
            'price' => 'From $999',
            'description' => 'For local businesses building a dependable presence in one channel.',
            'features' => ['Local SEO and business profile care', 'One managed channel', 'Two content pieces a month', 'Conversion tracking setup', 'Monthly plain-language report'],
            'is_recommended' => false,
        ],
        [
            'name' => 'Growth',
            'price' => 'From $2,499',
            'description' => 'For growing businesses ready to run search and paid media as one plan.',
            'features' => ['SEO and paid search managed together', 'Landing page improvements', 'Four content pieces a month', 'Social media campaign support', 'Monthly strategy call'],
            'is_recommended' => true,
        ],
        [
            'name' => 'Scale',
            'price' => 'From $4,999',
            'description' => 'For established teams who want every channel working to one strategy.',
            'features' => ['All core channels under one strategy', 'Conversion rate testing', 'Email automation', 'Custom reporting dashboard', 'Fortnightly strategy call'],
            'is_recommended' => false,
        ],
    ];

    public function run(): void
    {
        foreach (self::PLANS as $index => $plan) {
            PricingPlan::firstOrCreate(['name' => $plan['name']], [
                ...$plan,
                'period' => 'per month',
                'cta_label' => 'Get started',
                'cta_url' => '/free-consultation',
                'sort_order' => $index + 1,
                'status' => ContentStatus::Published,
            ]);
        }
    }
}
