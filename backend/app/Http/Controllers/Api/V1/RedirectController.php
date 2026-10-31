<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Redirect;
use Illuminate\Http\JsonResponse;

class RedirectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Redirect::where('is_active', true)->get(['from_path', 'to_path', 'status_code']),
        ]);
    }
}
