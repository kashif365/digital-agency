<?php

return [
    'frontend_url' => env('FRONTEND_URL', 'http://localhost:3000'),
    'revalidate_secret' => env('FRONTEND_REVALIDATE_SECRET'),
    'admin_notification_email' => env('ADMIN_NOTIFICATION_EMAIL'),

    // Identical submissions inside this window are dropped silently.
    'duplicate_window_seconds' => 600,

    // Anything submitted faster than this after the form rendered is treated as a bot.
    'min_fill_seconds' => 3,

    'max_links_in_message' => 3,

    'seed' => [
        'admin_email' => env('ADMIN_SEED_EMAIL'),
        'admin_password' => env('ADMIN_SEED_PASSWORD'),
        'company_name' => env('SEED_COMPANY_NAME', 'Your Agency'),
    ],
];
