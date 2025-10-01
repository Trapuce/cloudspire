<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'id' => $this->id,
            'name' => $this->name,
            'address1' => $this->address1,
            'address2' => $this->address2,
            'zipcode' => $this->zipcode,
            'city' => $this->city,
            'country' => $this->country,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'description' => $this->description,
            'max_capacity' => $this->max_capacity,
            'price_per_night' => $this->price_per_night,
            'pictures' => HotelPictureResource::collection($this->whenLoaded('pictures')),
            'first_picture' => new HotelPictureResource($this->whenLoaded('firstPicture')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
