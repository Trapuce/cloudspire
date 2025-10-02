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

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Le nom de l\'hôtel est obligatoire.',
            'name.string' => 'Le nom de l\'hôtel doit être une chaîne de caractères.',
            'name.max' => 'Le nom de l\'hôtel ne peut pas dépasser 255 caractères.',

            'address1.required' => 'L\'adresse principale est obligatoire.',
            'address1.string' => 'L\'adresse principale doit être une chaîne de caractères.',
            'address1.max' => 'L\'adresse principale ne peut pas dépasser 255 caractères.',

            'address2.string' => 'L\'adresse secondaire doit être une chaîne de caractères.',
            'address2.max' => 'L\'adresse secondaire ne peut pas dépasser 255 caractères.',

            'zipcode.required' => 'Le code postal est obligatoire.',
            'zipcode.string' => 'Le code postal doit être une chaîne de caractères.',
            'zipcode.max' => 'Le code postal ne peut pas dépasser 20 caractères.',

            'city.required' => 'La ville est obligatoire.',
            'city.string' => 'La ville doit être une chaîne de caractères.',
            'city.max' => 'Le nom de la ville ne peut pas dépasser 100 caractères.',

            'country.required' => 'Le pays est obligatoire.',
            'country.string' => 'Le pays doit être une chaîne de caractères.',
            'country.max' => 'Le nom du pays ne peut pas dépasser 100 caractères.',

            'lat.required' => 'La latitude est obligatoire.',
            'lat.numeric' => 'La latitude doit être un nombre.',
            'lat.between' => 'La latitude doit être comprise entre -90 et 90.',

            'lng.required' => 'La longitude est obligatoire.',
            'lng.numeric' => 'La longitude doit être un nombre.',
            'lng.between' => 'La longitude doit être comprise entre -180 et 180.',

            'description.string' => 'La description doit être une chaîne de caractères.',
            'description.max' => 'La description ne peut pas dépasser 5000 caractères.',

            'max_capacity.required' => 'La capacité maximale est obligatoire.',
            'max_capacity.integer' => 'La capacité maximale doit être un nombre entier.',
            'max_capacity.min' => 'La capacité maximale doit être d\'au moins 1 personne.',
            'max_capacity.max' => 'La capacité maximale ne peut pas dépasser 200 personnes.',

            'price_per_night.required' => 'Le prix par nuit est obligatoire.',
            'price_per_night.numeric' => 'Le prix par nuit doit être un nombre.',
            'price_per_night.min' => 'Le prix par nuit doit être positif ou nul.',
        ];
    }

    /**
     * Get custom attribute names for validation errors.
     */
    public function attributes(): array
    {
        return [
            'name' => 'nom de l\'hôtel',
            'address1' => 'adresse principale',
            'address2' => 'adresse secondaire',
            'zipcode' => 'code postal',
            'city' => 'ville',
            'country' => 'pays',
            'lat' => 'latitude',
            'lng' => 'longitude',
            'description' => 'description',
            'max_capacity' => 'capacité maximale',
            'price_per_night' => 'prix par nuit',
        ];
    }
}
