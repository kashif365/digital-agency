<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class PublicFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** Rules shared by every public form: spam fields and page tracking. */
    protected function commonRules(): array
    {
        return [
            'company_fax' => ['nullable', 'string', 'max:255'],
            'rendered_at' => ['nullable', 'integer'],
            'source_page' => ['nullable', 'string', 'max:255'],
        ];
    }
}
