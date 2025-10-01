<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HotelPicture extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'filepath',
        'filesize',
        'position',
    ];

    protected $casts = [
        'filesize' => 'integer',
        'position' => 'integer',
    ];

    /**
     * Get the hotel that owns the picture.
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}
