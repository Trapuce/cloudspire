<?php

use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\HotelPictureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Hotel routes
Route::apiResource('hotels', HotelController::class);

// Hotel picture routes
Route::prefix('hotels/{hotel}')->group(function () {
    Route::post('pictures', [HotelPictureController::class, 'store']);
    Route::post('pictures/multiple', [HotelPictureController::class, 'storeMultiple']);
    Route::patch('pictures/{picture}', [HotelPictureController::class, 'update']);
    Route::delete('pictures/{picture}', [HotelPictureController::class, 'destroy']);
});
