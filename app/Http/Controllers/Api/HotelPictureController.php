<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Models\HotelPicture;
use App\Http\Requests\StoreHotelPictureRequest;
use App\Http\Requests\StoreMultipleHotelPicturesRequest;
use App\Http\Resources\HotelPictureResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;


class HotelPictureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHotelPictureRequest $request , string $hotelId):JsonResponse
    {
         $hotel = Hotel::findOrFail($hotelId);
        
        $file = $request->file('picture');
        $filename = time() . '_' . $file->getClientOriginalName();
        $filepath = 'hotels/' . $filename;
        
        $file->storeAs('public/hotels', $filename);
        
        $nextPosition = $hotel->pictures()->max('position') + 1;
        
        
        $picture = HotelPicture::create([
            'hotel_id' => $hotel->id,
            'filepath' => $filepath,
            'filesize' => $file->getSize(),
            'position' => $nextPosition,
        ]);

        return response()->json([
            'message' => 'Picture uploaded successfully',
            'data' => new HotelPictureResource($picture),
        ], 201);
    }




     /**
     * Store multiple pictures for a hotel.
     */
    public function storeMultiple(StoreMultipleHotelPicturesRequest $request, string $hotelId): JsonResponse
    {
        $hotel = Hotel::findOrFail($hotelId);
        
        $files = $request->file('pictures');
        $uploadedPictures = [];
        $errors = [];
        
        $nextPosition = $hotel->pictures()->max('position') + 1;
        
        foreach ($files as $index => $file) {
            try {
                $filename = time() . '_' . $index . '_' . $file->getClientOriginalName();
                $filepath = 'hotels/' . $filename;
                
                $file->storeAs('public/hotels', $filename);
                
                $picture = HotelPicture::create([
                    'hotel_id' => $hotel->id,
                    'filepath' => $filepath,
                    'filesize' => $file->getSize(),
                    'position' => $nextPosition + $index,
                ]);
                
                $uploadedPictures[] = new HotelPictureResource($picture);
            } catch (\Exception $e) {
                $errors[] = [
                    'file' => $file->getClientOriginalName(),
                    'error' => $e->getMessage(),
                ];
            }
        }
        
        $response = [
            'message' => count($uploadedPictures) . ' picture(s) uploaded successfully',
            'data' => $uploadedPictures,
        ];
        
        if (!empty($errors)) {
            $response['errors'] = $errors;
            $response['message'] .= ', ' . count($errors) . ' failed';
        }
        
        return response()->json($response, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $hotelId, string $pictureId): JsonResponse
    {
           $hotel = Hotel::findOrFail($hotelId);
        $picture = $hotel->pictures()->findOrFail($pictureId);
        
        $request->validate([
            'position' => 'required|integer|min:0',
        ]);
        
        $picture->update([
            'position' => $request->position,
        ]);

        return response()->json([
            'message' => 'Picture position updated successfully',
            'data' => new HotelPictureResource($picture),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $hotelId, string $pictureId): JsonResponse
    {
         $hotel = Hotel::findOrFail($hotelId);
        $picture = $hotel->pictures()->findOrFail($pictureId);
        
        if (Storage::exists('public/' . $picture->filepath)) {
            Storage::delete('public/' . $picture->filepath);
        }
        
        $picture->delete();

        return response()->json([
            'message' => 'Picture deleted successfully',
        ]);
    }
}
