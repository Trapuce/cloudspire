<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address1',
        'address2',
        'zipcode',
        'city',
        'country',
        'lat',
        'lng',
        'description',
        'max_capacity',
        'price_per_night',
    ];

    protected $casts = [
        'lat' => 'decimal:8',
        'lng' => 'decimal:8',
        'price_per_night' => 'decimal:2',
        'max_capacity' => 'integer',
    ];

    /**
     * Get the pictures for the hotel.
     */
    public function pictures(): HasMany
    {
        return $this->hasMany(HotelPicture::class)->orderBy('position');
    }

    /**
     * Get the first picture for the hotel.
     */
    public function firstPicture(): HasOne
    {
        return $this->hasOne(HotelPicture::class)->orderBy('position');
    }
}
