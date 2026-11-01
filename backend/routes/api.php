<?php

use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\Admin\LeadController as AdminLeadController;
use App\Http\Controllers\Api\V1\BlogController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\FaqController;
use App\Http\Controllers\Api\V1\IndustryController;
use App\Http\Controllers\Api\V1\LeadController;
use App\Http\Controllers\Api\V1\PageController;
use App\Http\Controllers\Api\V1\PortfolioController;
use App\Http\Controllers\Api\V1\PricingController;
use App\Http\Controllers\Api\V1\RedirectController;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\SettingsController;
use App\Http\Controllers\Api\V1\SitemapController;
use App\Http\Controllers\Api\V1\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::middleware('brand.tokens')->group(function () {
        Route::get('services', [ServiceController::class, 'index']);
        Route::get('services/{slug}', [ServiceController::class, 'show']);
        Route::get('industries', [IndustryController::class, 'index']);
        Route::get('industries/{slug}', [IndustryController::class, 'show']);
        Route::get('pages/{slug}', [PageController::class, 'show']);
        Route::get('blog', [BlogController::class, 'index']);
        Route::get('blog-categories', [BlogController::class, 'categories']);
        Route::get('blog/{slug}', [BlogController::class, 'show']);
        Route::get('portfolio', [PortfolioController::class, 'index']);
        Route::get('portfolio/{slug}', [PortfolioController::class, 'show']);
        Route::get('pricing', [PricingController::class, 'index']);
        Route::get('testimonials', [TestimonialController::class, 'index']);
        Route::get('faqs', [FaqController::class, 'index']);
        Route::get('settings/public', [SettingsController::class, 'show']);
        Route::get('sitemap', [SitemapController::class, 'index']);
        Route::get('redirects', [RedirectController::class, 'index']);
    });

    Route::middleware('throttle:forms')->group(function () {
        Route::post('leads', [LeadController::class, 'store']);
        Route::post('contact', [ContactController::class, 'store']);
    });

    Route::prefix('admin')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->middleware('throttle:admin-login');

        Route::middleware(['auth:sanctum', 'admin.active'])->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('me', [AuthController::class, 'me']);
            Route::get('dashboard', DashboardController::class);
            Route::get('leads/export', [AdminLeadController::class, 'export']);
            Route::get('leads', [AdminLeadController::class, 'index']);
            Route::get('leads/{lead}', [AdminLeadController::class, 'show']);
            Route::patch('leads/{lead}', [AdminLeadController::class, 'update']);
            Route::post('leads/{lead}/notes', [AdminLeadController::class, 'addNote']);
        });
    });
});
