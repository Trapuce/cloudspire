<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMultipleHotelPicturesRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pictures' => 'required|array|min:1|max:10',
            'pictures.*' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:5120', 
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'pictures.required' => 'At least one picture is required.',
            'pictures.array' => 'Pictures must be an array.',
            'pictures.min' => 'At least one picture is required.',
            'pictures.max' => 'Maximum 10 pictures allowed.',
            'pictures.*.required' => 'Each picture is required.',
            'pictures.*.file' => 'Each item must be a file.',
            'pictures.*.image' => 'Each file must be an image.',
            'pictures.*.mimes' => 'Each image must be a jpeg, png, jpg, or webp file.',
            'pictures.*.max' => 'Each image must not exceed 5MB.',
        ];
    }
}
