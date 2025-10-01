<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHotelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
      return [
            'name' => 'sometimes|required|string|max:255',
            'address1' => 'sometimes|required|string|max:255',
            'address2' => 'nullable|string|max:255',
            'zipcode' => 'sometimes|required|string|max:20',
            'city' => 'sometimes|required|string|max:100',
            'country' => 'sometimes|required|string|max:100',
            'lat' => 'sometimes|required|numeric|between:-90,90',
            'lng' => 'sometimes|required|numeric|between:-180,180',
            'description' => 'nullable|string|max:5000',
            'max_capacity' => 'sometimes|required|integer|min:1|max:200',
            'price_per_night' => 'sometimes|required|numeric|min:0',
        ];
    }
}
