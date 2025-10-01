<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Hotel::factory(15)->create()->each(function ($hotel) {
            $pictureCount = rand(2, 5);
            \App\Models\HotelPicture::factory($pictureCount)->create([
                'hotel_id' => $hotel->id,
            ])->each(function ($picture, $index) {
                $picture->update(['position' => $index]);
            });
        });
    }
}
