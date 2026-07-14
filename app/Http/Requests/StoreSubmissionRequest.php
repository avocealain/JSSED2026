<?php
namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSubmissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'atelier_id' => ['required', 'integer', Rule::in([1, 2, 3])],
            'format' => ['required', 'string', Rule::in(['oral', 'poster'])],
            'langue' => ['required', 'string', Rule::in(['fr', 'en'])],
            'titre' => ['required', 'string', 'max:255'],
            'resume' => ['required', 'string', function ($attribute, $value, $fail) {
                if (str_word_count($value) > 300) {
                    $fail('Le résumé ne doit pas dépasser 300 mots.');
                }
            }],
            
            'keywords' => ['required', 'string', 'max:255'],
            'financement' => ['nullable', 'string', 'max:255'],
            'coauthors' => ['nullable', 'array'],
            'coauthors.*.prenom' => ['required_with:coauthors.*.nom', 'string', 'max:100'],
            'coauthors.*.nom' => ['required_with:coauthors.*.prenom', 'string', 'max:100'],
            'coauthors.*.institution' => ['nullable', 'string', 'max:255'],
            'consent' => ['accepted'],
        ];
    }
}