<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hotel>
 */
class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cities = [
            'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier',
            'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon',
        ];

        $countries = ['France', 'Belgium', 'Switzerland', 'Spain', 'Italy', 'Germany'];
        $country = $this->faker->randomElement($countries);
        $city = $this->faker->randomElement($cities);

        return [
            'name' => $this->faker->company().' Hotel',
            'address1' => $this->faker->streetAddress(),
            'address2' => $this->faker->optional(0.3)->secondaryAddress(),
            'zipcode' => $this->faker->postcode(),
            'city' => $city,
            'country' => $country,
            'lat' => $this->faker->latitude(-90, 90),
            'lng' => $this->faker->longitude(-180, 180),
            'description' => $this->faker->optional(0.8)->paragraphs(3, true),
            'max_capacity' => $this->faker->numberBetween(1, 200),
            'price_per_night' => $this->faker->randomFloat(2, 50, 500),
        ];
    }
}
