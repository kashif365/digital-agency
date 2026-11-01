<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PricingPlanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'period' => $this->period,
            'description' => $this->description,
            'features' => $this->features ?? [],
            'cta_label' => $this->cta_label,
            'cta_url' => $this->cta_url,
            'is_recommended' => $this->is_recommended,
        ];
    }
}
