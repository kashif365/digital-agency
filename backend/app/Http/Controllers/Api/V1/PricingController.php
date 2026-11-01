<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PricingPlanResource;
use App\Models\PricingPlan;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PricingController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return PricingPlanResource::collection(
            PricingPlan::published()->orderBy('sort_order')->get()
        );
    }
}
