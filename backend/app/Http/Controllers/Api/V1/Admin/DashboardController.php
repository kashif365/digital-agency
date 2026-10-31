<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\LeadResource;
use App\Models\Lead;
use App\Services\DashboardStats;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request, DashboardStats $stats): JsonResponse
    {
        $this->authorize('viewAny', Lead::class);

        return response()->json(['data' => [
            ...$stats->summary(),
            'recent_leads' => LeadResource::collection($stats->recentLeads()),
        ]]);
    }
}
