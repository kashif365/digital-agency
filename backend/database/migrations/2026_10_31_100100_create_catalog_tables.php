<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_category_id')->constrained()->restrictOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('short_description', 500);
            $table->string('icon')->default('sparkles');
            $table->string('hero_heading')->nullable();
            $table->text('hero_text')->nullable();
            $table->longText('overview')->nullable();
            $table->json('audience')->nullable();
            $table->json('problems')->nullable();
            $table->json('deliverables')->nullable();
            $table->json('process')->nullable();
            $table->json('benefits')->nullable();
            $table->foreignId('featured_media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('featured_order')->default(0);
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('status')->default('draft');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'sort_order']);
            $table->index(['is_featured', 'status']);
        });

        Schema::create('industries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('icon')->default('building-2');
            $table->string('short_description', 500);
            $table->longText('overview')->nullable();
            $table->json('challenges')->nullable();
            $table->json('approach')->nullable();
            $table->foreignId('featured_media_id')->nullable()->constrained('media')->nullOnDelete();
            // Cards always show when published; the detail page only exists when targeted.
            $table->boolean('has_page')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('status')->default('draft');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'sort_order']);
        });

        Schema::create('industry_service', function (Blueprint $table) {
            $table->foreignId('industry_id')->constrained()->cascadeOnDelete();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->primary(['industry_id', 'service_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('industry_service');
        Schema::dropIfExists('industries');
        Schema::dropIfExists('services');
        Schema::dropIfExists('service_categories');
    }
};
