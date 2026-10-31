<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customer_name,
            'company_name' => $this->company_name,
            'body' => $this->body,
            'rating' => $this->rating,
            'date' => $this->testimonial_date?->toDateString(),
            'avatar' => $this->avatar?->toPublicArray(),
        ];
    }
}
