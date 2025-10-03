<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hotels = [
            [
                'name' => 'Hotel Plaza Paris',
                'address1' => '123 Champs-Élysées',
                'address2' => null,
                'zipcode' => '75008',
                'city' => 'Paris',
                'country' => 'France',
                'lat' => 48.8566,
                'lng' => 2.3522,
                'description' => 'Un hôtel de luxe au cœur de Paris avec vue sur les Champs-Élysées.',
                'max_capacity' => 150,
                'price_per_night' => 299.99,
            ],
            [
                'name' => 'Grand Hotel Lyon',
                'address1' => '456 Rue de la République',
                'address2' => null,
                'zipcode' => '69002',
                'city' => 'Lyon',
                'country' => 'France',
                'lat' => 45.7640,
                'lng' => 4.8357,
                'description' => 'Hôtel moderne dans le centre historique de Lyon.',
                'max_capacity' => 100,
                'price_per_night' => 199.99,
            ],
            [
                'name' => 'Marseille Resort',
                'address1' => '789 Vieux Port',
                'address2' => null,
                'zipcode' => '13001',
                'city' => 'Marseille',
                'country' => 'France',
                'lat' => 43.2965,
                'lng' => 5.3698,
                'description' => 'Résort avec vue sur le Vieux Port de Marseille.',
                'max_capacity' => 200,
                'price_per_night' => 249.99,
            ],
       
        ];

        $realHotelImages = [
            'hotel1.jpg',
            'hotel2.jpg', 
            'hotel3.jpg',
            'hotel4.jpg',
            'hotel5.jpg',
        ];

        foreach ($hotels as $hotelData) {
            $hotel = \App\Models\Hotel::create($hotelData);
            
            $imageCount = rand(2, 3);
            for ($i = 0; $i < $imageCount; $i++) {
                $randomImage = $realHotelImages[array_rand($realHotelImages)];
                
                $filename = 'hotel_' . $hotel->id . '_' . $i . '_' . time() . '.jpg';
                $filepath = 'hotels/' . $filename;
                
                $sourcePath = public_path('images/hotels/' . $randomImage);
                $destinationPath = storage_path('app/public/hotels/' . $filename);
                
                if (File::exists($sourcePath)) {
                    File::copy($sourcePath, $destinationPath);
                    
                    $filesize = File::size($destinationPath);
                    
                    \App\Models\HotelPicture::create([
                        'hotel_id' => $hotel->id,
                        'filepath' => $filepath,
                        'filesize' => $filesize,
                        'position' => $i,
                    ]);
                }
            }
        }
    }
}
