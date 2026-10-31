<?php

namespace App\Http\Requests;

class StoreContactRequest extends PublicFormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'string', 'email:rfc', 'max:190'],
            'phone' => ['nullable', 'string', 'regex:/^[0-9+()\-.\s]{7,25}$/'],
            'subject' => ['nullable', 'string', 'max:160'],
            'message' => ['required', 'string', 'min:10', 'max:3000'],
            ...$this->commonRules(),
        ];
    }

    public function messages(): array
    {
        return ['phone.regex' => 'Please enter a valid phone number.'];
    }
}
