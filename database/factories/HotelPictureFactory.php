<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HotelPicture>
 */
class HotelPictureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $extensions = ['jpg', 'jpeg', 'png', 'webp'];
        $extension = $this->faker->randomElement($extensions);
        $filename = $this->faker->uuid().'.'.$extension;

        return [
            'hotel_id' => \App\Models\Hotel::factory(),
            'filepath' => 'hotels/'.$filename,
            'filesize' => $this->faker->numberBetween(100000, 5000000), 
            'position' => $this->faker->numberBetween(0, 10),
        ];
    }
}
