<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            // System pages back a fixed frontend route, so their slug is locked.
            $table->boolean('is_system')->default(false);
            $table->string('status')->default('draft')->index();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->json('data')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index(['page_id', 'is_visible', 'sort_order']);
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            // Null service_id means a general FAQ shown on the homepage.
            $table->foreignId('service_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('question');
            $table->text('answer');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['service_id', 'is_active', 'sort_order']);
        });

        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('company_name')->nullable();
            $table->text('body');
            $table->unsignedTinyInteger('rating')->nullable();
            $table->foreignId('avatar_media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->date('testimonial_date')->nullable();
            // Nothing is public until the client has approved it.
            $table->boolean('is_approved')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['is_approved', 'sort_order']);
        });

        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('client_name')->nullable();
            $table->foreignId('industry_id')->nullable()->constrained()->nullOnDelete();
            // Illustrative work is labelled as such everywhere it appears.
            $table->boolean('is_illustrative')->default(false);
            $table->text('summary')->nullable();
            $table->longText('overview')->nullable();
            $table->longText('challenges')->nullable();
            $table->longText('strategy')->nullable();
            $table->longText('outcomes')->nullable();
            // Outcomes are withheld from the API until someone confirms they are verified.
            $table->boolean('outcomes_verified')->default(false);
            $table->foreignId('featured_media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('status')->default('draft');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'sort_order']);
        });

        Schema::create('portfolio_service', function (Blueprint $table) {
            $table->foreignId('portfolio_id')->constrained()->cascadeOnDelete();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->primary(['portfolio_id', 'service_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_service');
        Schema::dropIfExists('portfolios');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('page_sections');
        Schema::dropIfExists('pages');
    }
};
