<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Http\Resources\HotelResource;
use Illuminate\Http\JsonResponse;


class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request):JsonResponse
    {
       
        $query = Hotel::query();

        if ($request->has('q') && $request->q) {
            $searchTerm = $request->q;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('city', 'like', "%{$searchTerm}%");
            });
        }

        $sortBy = $request->get('sort', 'created_at');
        $sortOrder = $request->get('order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->get('per_page', 15);
        $hotels = $query->with('firstPicture')->paginate($perPage);

        return response()->json([
            'data' => HotelResource::collection($hotels->items()),
            'meta' => [
                'current_page' => $hotels->currentPage(),
                'last_page' => $hotels->lastPage(),
                'per_page' => $hotels->perPage(),
                'total' => $hotels->total(),
                'from' => $hotels->firstItem(),
                'to' => $hotels->lastItem(),
            ],
            'links' => [
                'first' => $hotels->url(1),
                'last' => $hotels->url($hotels->lastPage()),
                'prev' => $hotels->previousPageUrl(),
                'next' => $hotels->nextPageUrl(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHotelRequest $request):JsonResponse
    {
        $hotel = Hotel::create($request->validated());

        return response()->json([
            'message' => 'Hotel created successfully',
            'data' => new HotelResource($hotel),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id):JsonResponse
    {
        $hotel = Hotel::with('pictures')->findOrFail($id);

        return response()->json([
            'data' => new HotelResource($hotel),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHotelRequest $request, string $id):JsonResponse
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->update($request->validated());

        return response()->json([
            'message' => 'Hotel updated successfully',
            'data' => new HotelResource($hotel),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id):JsonResponse
    {
         $hotel = Hotel::findOrFail($id);
        $hotel->delete();

        return response()->json([
            'message' => 'Hotel deleted successfully',
        ]);
    }
}
