<?php

namespace App\Http\Requests;

use App\Enums\ContentStatus;
use App\Models\WebsiteSetting;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreLeadRequest extends PublicFormRequest
{
    protected function prepareForValidation(): void
    {
        $website = trim((string) $this->input('website'));

        if ($website !== '' && ! Str::startsWith(Str::lower($website), ['http://', 'https://'])) {
            $this->merge(['website' => "https://{$website}"]);
        }
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'min:2', 'max:120'],
            'business_name' => ['required', 'string', 'min:2', 'max:160'],
            'email' => ['required', 'string', 'email:rfc', 'max:190'],
            'phone' => ['required', 'string', 'regex:/^[0-9+()\-.\s]{7,25}$/'],
            'website' => ['nullable', 'url:http,https', 'max:255'],
            'service_id' => ['required', 'integer', Rule::exists('services', 'id')
                ->where('status', ContentStatus::Published->value)
                ->whereNull('deleted_at')],
            'budget' => ['nullable', 'string', Rule::in(WebsiteSetting::value('forms.budget_ranges', []))],
            'message' => ['required', 'string', 'min:10', 'max:3000'],
            ...$this->commonRules(),
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex' => 'Please enter a valid phone number.',
            'service_id.required' => 'Please choose the service you are interested in.',
            'service_id.exists' => 'Please choose a service from the list.',
        ];
    }
}
