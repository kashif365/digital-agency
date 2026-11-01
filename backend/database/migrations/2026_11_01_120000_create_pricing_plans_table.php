<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // Free text, so a plan can read "From $999" or "Custom".
            $table->string('price', 40);
            $table->string('period', 40)->nullable();
            $table->string('description', 300)->nullable();
            $table->json('features')->nullable();
            $table->string('cta_label', 60)->nullable();
            $table->string('cta_url')->nullable();
            $table->boolean('is_recommended')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('status')->default('draft');
            $table->timestamps();

            $table->index(['status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
