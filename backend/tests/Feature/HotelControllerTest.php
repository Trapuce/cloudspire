<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HotelControllerTest extends TestCase
{
 use RefreshDatabase, WithFaker;

    public function test_can_get_hotels_list(): void
    {
        
        Hotel::factory(5)->create();

        $response = $this->getJson('/api/hotels');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'address1',
                        'city',
                        'country',
                        'max_capacity',
                        'price_per_night',
                        'created_at',
                        'updated_at',
                    ]
                ],
                'meta' => [
                    'current_page',
                    'last_page',
                    'per_page',
                    'total',
                ]
            ]);
    }


    public function test_can_search_hotels(): void
    {
        Hotel::factory()->create(['name' => 'Hotel Paris Central']);
        Hotel::factory()->create(['name' => 'Hotel Lyon Center']);
        Hotel::factory()->create(['city' => 'Paris']);

        $response = $this->getJson('/api/hotels?q=Paris');

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
    }

    public function test_can_get_single_hotel(): void
    {
        $hotel = Hotel::factory()->create();

        $response = $this->getJson("/api/hotels/{$hotel->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $hotel->id,
                    'name' => $hotel->name,
                    'address1' => $hotel->address1,
                    'city' => $hotel->city,
                    'country' => $hotel->country,
                ]
            ]);
    }

    public function test_can_create_hotel(): void
    {
        $hotelData = [
            'name' => 'Test Hotel',
            'address1' => '123 Test Street',
            'address2' => 'Suite 100',
            'zipcode' => '12345',
            'city' => 'Test City',
            'country' => 'Test Country',
            'lat' => 48.8566,
            'lng' => 2.3522,
            'description' => 'A test hotel',
            'max_capacity' => 50,
            'price_per_night' => 99.99,
        ];

        $response = $this->postJson('/api/hotels', $hotelData);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Hotel created successfully',
                'data' => [
                    'name' => $hotelData['name'],
                    'address1' => $hotelData['address1'],
                    'city' => $hotelData['city'],
                    'country' => $hotelData['country'],
                ]
            ]);

        $this->assertDatabaseHas('hotels', [
            'name' => $hotelData['name'],
            'city' => $hotelData['city'],
        ]);
    }

    public function test_can_update_hotel(): void
    {
        $hotel = Hotel::factory()->create();

        $updateData = [
            'name' => 'Updated Hotel Name',
            'city' => 'Updated City',
        ];

        $response = $this->putJson("/api/hotels/{$hotel->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Hotel updated successfully',
                'data' => [
                    'id' => $hotel->id,
                    'name' => $updateData['name'],
                    'city' => $updateData['city'],
                ]
            ]);

        $this->assertDatabaseHas('hotels', [
            'id' => $hotel->id,
            'name' => $updateData['name'],
            'city' => $updateData['city'],
        ]);
    }

    public function test_can_delete_hotel(): void
    {
        $hotel = Hotel::factory()->create();

        $response = $this->deleteJson("/api/hotels/{$hotel->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Hotel deleted successfully'
            ]);

        $this->assertDatabaseMissing('hotels', [
            'id' => $hotel->id,
        ]);
    }

    public function test_validation_errors_on_create(): void
    {
        $response = $this->postJson('/api/hotels', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
                'address1',
                'zipcode',
                'city',
                'country',
                'lat',
                'lng',
                'max_capacity',
                'price_per_night',
            ]);
    }

    public function test_returns_404_for_nonexistent_hotel(): void
    {
        $response = $this->getJson('/api/hotels/999');

        $response->assertStatus(404);
    }
}
