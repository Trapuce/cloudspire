<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelPictureResource extends JsonResource
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
            'hotel_id' => $this->hotel_id,
            'filepath' => $this->filepath,
            'filesize' => $this->filesize,
            'position' => $this->position,
            'url' => asset('storage/' . $this->filepath),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
