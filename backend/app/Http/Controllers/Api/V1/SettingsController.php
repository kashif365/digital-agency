<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\WebsiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

class SettingsController extends Controller
{
    public function show(): JsonResponse
    {
        $settings = WebsiteSetting::publicTree();

        $settings['company']['logo'] = $this->media(Arr::pull($settings, 'company.logo_media_id'));
        $settings['company']['banner'] = $this->media(Arr::pull($settings, 'company.banner_media_id'));
        $settings['seo']['default_og_image'] = $this->media(Arr::pull($settings, 'seo.default_og_media_id'))['url'] ?? null;

        return response()->json(['data' => $settings]);
    }

    private function media(mixed $id): ?array
    {
        return $id ? Media::find($id)?->toPublicArray() : null;
    }
}
