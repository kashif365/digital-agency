<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\LeadStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreLeadNoteRequest;
use App\Http\Requests\Admin\UpdateLeadRequest;
use App\Http\Resources\Admin\LeadNoteResource;
use App\Http\Resources\Admin\LeadResource;
use App\Models\Lead;
use App\Models\LeadNote;
use App\Services\LeadExporter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeadController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Lead::class);

        return LeadResource::collection($this->filtered($request)->latest()->paginate(25)->withQueryString());
    }

    public function export(Request $request, LeadExporter $exporter): StreamedResponse
    {
        $this->authorize('export', Lead::class);

        return $exporter->download($this->filtered($request));
    }

    public function show(Lead $lead): LeadResource
    {
        $this->authorize('view', $lead);

        return new LeadResource($lead->load('notes.user'));
    }

    public function update(UpdateLeadRequest $request, Lead $lead): LeadResource
    {
        $lead->changeStatus($request->enum('status', LeadStatus::class), $request->user());

        return new LeadResource($lead->load('notes.user'));
    }

    public function addNote(StoreLeadNoteRequest $request, Lead $lead): JsonResponse
    {
        $note = $lead->notes()->create([
            'user_id' => $request->user()->id,
            'type' => LeadNote::TYPE_NOTE,
            'body' => $request->validated('body'),
        ]);

        return (new LeadNoteResource($note->load('user')))->response()->setStatusCode(201);
    }

    private function filtered(Request $request): Builder
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:120'],
            'status' => ['nullable', Rule::enum(LeadStatus::class)],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date'],
        ]);

        return Lead::query()
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['from'] ?? null, fn ($query, $from) => $query->whereDate('created_at', '>=', $from))
            ->when($filters['to'] ?? null, fn ($query, $to) => $query->whereDate('created_at', '<=', $to))
            ->when($filters['search'] ?? null, fn ($query, $search) => $query->where(fn ($inner) => $inner
                ->where('full_name', 'like', "%{$search}%")
                ->orWhere('business_name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%")));
    }
}
