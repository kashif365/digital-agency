<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            // [{media_id, caption, kind: desktop|mobile|detail}], shown in order on the case study.
            $table->json('gallery')->nullable()->after('featured_media_id');
            // [{title, text}]
            $table->json('deliverables')->nullable()->after('strategy');
            $table->string('website_url')->nullable()->after('client_name');
            $table->date('completed_on')->nullable()->after('website_url');
        });
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn(['gallery', 'deliverables', 'website_url', 'completed_on']);
        });
    }
};
