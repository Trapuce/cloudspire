<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Hotel;
use App\Models\HotelPicture;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class HotelPictureControllerTest extends TestCase
{
   use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_can_upload_single_picture(): void
    {
        $hotel = Hotel::factory()->create();
        $file = UploadedFile::fake()->image('hotel.jpg', 800, 600);

        $response = $this->postJson("/api/hotels/{$hotel->id}/pictures", [
            'picture' => $file,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Picture uploaded successfully',
            ])
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'hotel_id',
                    'filepath',
                    'filesize',
                    'position',
                    'url',
                ]
            ]);

        $this->assertDatabaseHas('hotel_pictures', [
            'hotel_id' => $hotel->id,
        ]);

        $picture = $hotel->pictures()->first();
        $this->assertNotNull($picture);
        $this->assertStringStartsWith('hotels/', $picture->filepath);
    }

    public function test_can_upload_multiple_pictures(): void
    {
        $hotel = Hotel::factory()->create();
        $files = [
            UploadedFile::fake()->image('hotel1.jpg', 800, 600),
            UploadedFile::fake()->image('hotel2.jpg', 800, 600),
            UploadedFile::fake()->image('hotel3.jpg', 800, 600),
        ];

        $response = $this->postJson("/api/hotels/{$hotel->id}/pictures/multiple", [
            'pictures' => $files,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'message' => '3 picture(s) uploaded successfully',
            ])
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'hotel_id',
                        'filepath',
                        'filesize',
                        'position',
                        'url',
                    ]
                ]
            ]);

        $this->assertCount(3, $response->json('data'));
        $this->assertDatabaseCount('hotel_pictures', 3);
    }

    public function test_can_update_picture_position(): void
    {
        $hotel = Hotel::factory()->create();
        $picture = HotelPicture::factory()->create([
            'hotel_id' => $hotel->id,
            'position' => 1,
        ]);

        $response = $this->patchJson("/api/hotels/{$hotel->id}/pictures/{$picture->id}", [
            'position' => 5,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Picture position updated successfully',
                'data' => [
                    'id' => $picture->id,
                    'position' => 5,
                ]
            ]);

        $this->assertDatabaseHas('hotel_pictures', [
            'id' => $picture->id,
            'position' => 5,
        ]);
    }

    public function test_can_delete_picture(): void
    {
        $hotel = Hotel::factory()->create();
        $picture = HotelPicture::factory()->create([
            'hotel_id' => $hotel->id,
        ]);

        $response = $this->deleteJson("/api/hotels/{$hotel->id}/pictures/{$picture->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Picture deleted successfully'
            ]);

        $this->assertDatabaseMissing('hotel_pictures', [
            'id' => $picture->id,
        ]);
    }

    public function test_validation_errors_on_single_upload(): void
    {
        $hotel = Hotel::factory()->create();

        $response = $this->postJson("/api/hotels/{$hotel->id}/pictures", []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['picture']);
    }

    public function test_validation_errors_on_multiple_upload(): void
    {
        $hotel = Hotel::factory()->create();

        $response = $this->postJson("/api/hotels/{$hotel->id}/pictures/multiple", []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['pictures']);
    }

    public function test_rejects_invalid_file_types(): void
    {
        $hotel = Hotel::factory()->create();
        $file = UploadedFile::fake()->create('document.pdf', 1000);

        $response = $this->postJson("/api/hotels/{$hotel->id}/pictures", [
            'picture' => $file,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['picture']);
    }

    public function test_rejects_oversized_files(): void
    {
        $hotel = Hotel::factory()->create();
        $file = UploadedFile::fake()->image('large.jpg')->size(6000); 

        $response = $this->postJson("/api/hotels/{$hotel->id}/pictures", [
            'picture' => $file,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['picture']);
    }

    public function test_returns_404_for_nonexistent_hotel(): void
    {
        $file = UploadedFile::fake()->image('hotel.jpg');

        $response = $this->postJson("/api/hotels/999/pictures", [
            'picture' => $file,
        ]);

        $response->assertStatus(404);
    }

    public function test_returns_404_for_nonexistent_picture(): void
    {
        $hotel = Hotel::factory()->create();

        $response = $this->deleteJson("/api/hotels/{$hotel->id}/pictures/999");

        $response->assertStatus(404);
    }

    public function test_multiple_upload_with_mixed_results(): void
    {
        $hotel = Hotel::factory()->create();
        $files = [
            UploadedFile::fake()->image('valid1.jpg', 800, 600),
            UploadedFile::fake()->create('invalid.pdf', 1000), 
            UploadedFile::fake()->image('valid2.jpg', 800, 600),
        ];

        $response = $this->postJson("/api/hotels/{$hotel->id}/pictures/multiple", [
            'pictures' => $files,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['pictures.1']);
    }
}
