<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Models\Lead;
use App\Models\Service;
use App\Notifications\NewLeadReceived;
use App\Services\SubmissionGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request, SubmissionGuard $guard): JsonResponse
    {
        $data = $request->validated();
        $success = response()->json(['message' => $guard->successMessage()], 201);

        // Rejected and duplicate submissions get the normal response so bots learn nothing.
        if ($reason = $guard->spamReason($request, $data['message'])) {
            $guard->logRejected($request, $reason);

            return $success;
        }

        $fingerprint = $guard->fingerprint('lead', $data['email'], $data['message']);

        if (! $guard->claim($fingerprint)) {
            return $success;
        }

        $lead = Lead::create([
            ...collect($data)->except(['company_fax', 'rendered_at'])->all(),
            'service_name' => Service::whereKey($data['service_id'])->value('title'),
            'ip_address' => $request->ip(),
            'user_agent' => Str::limit((string) $request->userAgent(), 490, ''),
            'fingerprint' => $fingerprint,
        ]);

        if ($recipient = $guard->notificationRecipient()) {
            // The lead is already stored, so a mail outage must not fail the visitor's request.
            rescue(fn () => Notification::route('mail', $recipient)->notify(new NewLeadReceived($lead)));
        }

        return $success;
    }
}
