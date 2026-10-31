<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\ContactSubmission;
use App\Notifications\NewContactMessage;
use App\Services\SubmissionGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request, SubmissionGuard $guard): JsonResponse
    {
        $data = $request->validated();
        $success = response()->json(['message' => $guard->successMessage()], 201);

        if ($reason = $guard->spamReason($request, $data['message'])) {
            $guard->logRejected($request, $reason);

            return $success;
        }

        $fingerprint = $guard->fingerprint('contact', $data['email'], $data['message']);

        if (! $guard->claim($fingerprint)) {
            return $success;
        }

        $submission = ContactSubmission::create([
            ...collect($data)->except(['company_fax', 'rendered_at'])->all(),
            'ip_address' => $request->ip(),
            'user_agent' => Str::limit((string) $request->userAgent(), 490, ''),
            'fingerprint' => $fingerprint,
        ]);

        if ($recipient = $guard->notificationRecipient()) {
            rescue(fn () => Notification::route('mail', $recipient)->notify(new NewContactMessage($submission)));
        }

        return $success;
    }
}
