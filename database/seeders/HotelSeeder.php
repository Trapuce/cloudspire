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
            [
                'name' => 'Toulouse Business Hotel',
                'address1' => '321 Place du Capitole',
                'address2' => 'Suite 100',
                'zipcode' => '31000',
                'city' => 'Toulouse',
                'country' => 'France',
                'lat' => 43.6047,
                'lng' => 1.4442,
                'description' => 'Hôtel d\'affaires moderne au centre de Toulouse.',
                'max_capacity' => 120,
                'price_per_night' => 179.99,
            ],
            [
                'name' => 'Nice Beach Resort',
                'address1' => '654 Promenade des Anglais',
                'address2' => null,
                'zipcode' => '06000',
                'city' => 'Nice',
                'country' => 'France',
                'lat' => 43.7102,
                'lng' => 7.2620,
                'description' => 'Résort de luxe face à la mer Méditerranée.',
                'max_capacity' => 180,
                'price_per_night' => 399.99,
            ],
            [
                'name' => 'Nantes Historic Inn',
                'address1' => '987 Château des Ducs',
                'address2' => null,
                'zipcode' => '44000',
                'city' => 'Nantes',
                'country' => 'France',
                'lat' => 47.2184,
                'lng' => -1.5536,
                'description' => 'Auberge historique près du château des Ducs de Bretagne.',
                'max_capacity' => 80,
                'price_per_night' => 149.99,
            ],
            [
                'name' => 'Strasbourg European Hotel',
                'address1' => '147 Grande Île',
                'address2' => null,
                'zipcode' => '67000',
                'city' => 'Strasbourg',
                'country' => 'France',
                'lat' => 48.5734,
                'lng' => 7.7521,
                'description' => 'Hôtel au cœur de la Grande Île, patrimoine mondial de l\'UNESCO.',
                'max_capacity' => 90,
                'price_per_night' => 189.99,
            ],
            [
                'name' => 'Montpellier University Hotel',
                'address1' => '258 Place de la Comédie',
                'address2' => null,
                'zipcode' => '34000',
                'city' => 'Montpellier',
                'country' => 'France',
                'lat' => 43.6110,
                'lng' => 3.8767,
                'description' => 'Hôtel moderne près de l\'université et du centre historique.',
                'max_capacity' => 110,
                'price_per_night' => 169.99,
            ],
            [
                'name' => 'Bordeaux Wine Hotel',
                'address1' => '369 Quai des Chartrons',
                'address2' => null,
                'zipcode' => '33000',
                'city' => 'Bordeaux',
                'country' => 'France',
                'lat' => 44.8378,
                'lng' => -0.5792,
                'description' => 'Hôtel thématique dédié au vin dans le quartier des Chartrons.',
                'max_capacity' => 130,
                'price_per_night' => 219.99,
            ],
            [
                'name' => 'Lille Grand Place Hotel',
                'address1' => '741 Place du Général de Gaulle',
                'address2' => null,
                'zipcode' => '59000',
                'city' => 'Lille',
                'country' => 'France',
                'lat' => 50.6292,
                'lng' => 3.0573,
                'description' => 'Hôtel élégant sur la Grand Place de Lille.',
                'max_capacity' => 95,
                'price_per_night' => 159.99,
            ],
            [
                'name' => 'Rennes Medieval Inn',
                'address1' => '852 Rue du Chapitre',
                'address2' => null,
                'zipcode' => '35000',
                'city' => 'Rennes',
                'country' => 'France',
                'lat' => 48.1173,
                'lng' => -1.6778,
                'description' => 'Auberge dans le centre médiéval de Rennes.',
                'max_capacity' => 70,
                'price_per_night' => 139.99,
            ],
            [
                'name' => 'Reims Champagne Hotel',
                'address1' => '963 Avenue de Champagne',
                'address2' => null,
                'zipcode' => '51100',
                'city' => 'Reims',
                'country' => 'France',
                'lat' => 49.2583,
                'lng' => 4.0317,
                'description' => 'Hôtel de luxe dans la capitale du champagne.',
                'max_capacity' => 160,
                'price_per_night' => 279.99,
            ],
            [
                'name' => 'Le Havre Port Hotel',
                'address1' => '147 Quai de Southampton',
                'address2' => null,
                'zipcode' => '76600',
                'city' => 'Le Havre',
                'country' => 'France',
                'lat' => 49.4944,
                'lng' => 0.1079,
                'description' => 'Hôtel moderne avec vue sur le port du Havre.',
                'max_capacity' => 140,
                'price_per_night' => 199.99,
            ],
            [
                'name' => 'Saint-Étienne Design Hotel',
                'address1' => '258 Place Jean Jaurès',
                'address2' => null,
                'zipcode' => '42000',
                'city' => 'Saint-Étienne',
                'country' => 'France',
                'lat' => 45.4397,
                'lng' => 4.3872,
                'description' => 'Hôtel design dans le centre de Saint-Étienne.',
                'max_capacity' => 85,
                'price_per_night' => 149.99,
            ],
            [
                'name' => 'Toulon Naval Hotel',
                'address1' => '369 Port de Toulon',
                'address2' => null,
                'zipcode' => '83000',
                'city' => 'Toulon',
                'country' => 'France',
                'lat' => 43.1242,
                'lng' => 5.9280,
                'description' => 'Hôtel avec vue sur le port militaire de Toulon.',
                'max_capacity' => 125,
                'price_per_night' => 189.99,
            ]
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
