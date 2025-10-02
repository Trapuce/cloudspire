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
        // Liste des vraies images d'hôtels disponibles
        $realHotelImages = [
            'hotel1.jpg',
            'hotel2.jpg', 
            'hotel3.jpg',
            'hotel4.jpg',
            'hotel5.jpg',
            'hotel6.jpg',
            'hotel7.jpg',
            'hotel8.jpg',
            'hotel9.jpg',
            'hotel10.jpg',
        ];

        // Create 15 hotels with real pictures
        \App\Models\Hotel::factory(15)->create()->each(function ($hotel) use ($realHotelImages) {
            // Create 2-5 pictures for each hotel using real images
            $pictureCount = rand(2, 5);
            
            for ($i = 0; $i < $pictureCount; $i++) {
                // Sélectionner une image aléatoire
                $randomImage = $realHotelImages[array_rand($realHotelImages)];
                
                // Créer un nom de fichier unique pour cette image
                $filename = 'hotel_' . $hotel->id . '_' . $i . '_' . time() . '.jpg';
                $filepath = 'hotels/' . $filename;
                
                // Copier l'image réelle vers le dossier des uploads
                $sourcePath = storage_path('app/public/hotels/seeders/' . $randomImage);
                $destinationPath = storage_path('app/public/hotels/' . $filename);
                
                if (File::exists($sourcePath)) {
                    File::copy($sourcePath, $destinationPath);
                    
                    // Obtenir la taille du fichier
                    $filesize = File::size($destinationPath);
                    
                    // Créer l'enregistrement de la photo
                    \App\Models\HotelPicture::create([
                        'hotel_id' => $hotel->id,
                        'filepath' => $filepath,
                        'filesize' => $filesize,
                        'position' => $i,
                    ]);
                }
            }
        });
    }
}
