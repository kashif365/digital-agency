<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'business_name' => $this->business_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'website' => $this->website,
            'service' => $this->service_name,
            'budget' => $this->budget,
            'message' => $this->message,
            'status' => $this->status->value,
            'status_label' => $this->status->getLabel(),
            'source_page' => $this->source_page,
            'created_at' => $this->created_at?->toIso8601String(),
            'notes' => LeadNoteResource::collection($this->whenLoaded('notes')),
            'submission_history' => $this->when(
                $this->relationLoaded('notes'),
                fn () => $this->submissionHistory()->map->only(['id', 'service_name', 'message', 'created_at'])
            ),
        ];
    }
}
