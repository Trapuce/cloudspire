<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Http\Resources\HotelResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;



class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request):JsonResponse
    {
       
        try {
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
            
            $allowedSortFields = ['name', 'city', 'country', 'price_per_night', 'max_capacity', 'created_at', 'updated_at'];
            if (!in_array($sortBy, $allowedSortFields)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Champ de tri non autorisé. Champs autorisés: ' . implode(', ', $allowedSortFields),
                    'status_code' => 400,
                ], 400);
            }

            $query->orderBy($sortBy, $sortOrder);

            $perPage = $request->get('per_page', 15);
            if ($perPage > 100) {
                $perPage = 100; 
            }

            $hotels = $query->with('firstPicture')->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Liste des hôtels récupérée avec succès',
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
        } catch (QueryException $e) {
            Log::error('Erreur lors de la récupération des hôtels: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des hôtels',
                'status_code' => 500,
            ], 500);
        } catch (\Exception $e) {
            Log::error('Erreur inattendue lors de la récupération des hôtels: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Une erreur inattendue s\'est produite',
                'status_code' => 500,
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHotelRequest $request):JsonResponse
    {
        try {
            $hotel = Hotel::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Hôtel créé avec succès',
                'data' => new HotelResource($hotel),
                'status_code' => 201,
            ], 201);
        } catch (QueryException $e) {
            Log::error('Erreur lors de la création de l\'hôtel: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de l\'hôtel. Vérifiez les données fournies.',
                'status_code' => 500,
            ], 500);
        } catch (\Exception $e) {
            Log::error('Erreur inattendue lors de la création de l\'hôtel: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Une erreur inattendue s\'est produite lors de la création de l\'hôtel',
                'status_code' => 500,
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id):JsonResponse
    {
        try {
            // Validation de l'ID
            if (!is_numeric($id) || $id <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'ID d\'hôtel invalide',
                    'status_code' => 400,
                ], 400);
            }

            $hotel = Hotel::with(['pictures', 'firstPicture'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Hôtel récupéré avec succès',
                'data' => new HotelResource($hotel),
                'status_code' => 200,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hôtel non trouvé',
                'status_code' => 404,
            ], 404);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération de l\'hôtel ID ' . $id . ': ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de l\'hôtel',
                'status_code' => 500,
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHotelRequest $request, string $id):JsonResponse
    {
         try {
            // Validation de l'ID
            if (!is_numeric($id) || $id <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'ID d\'hôtel invalide',
                    'status_code' => 400,
                ], 400);
            }

            $hotel = Hotel::findOrFail($id);
            $hotel->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Hôtel mis à jour avec succès',
                'data' => new HotelResource($hotel->fresh()),
                'status_code' => 200,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hôtel non trouvé',
                'status_code' => 404,
            ], 404);
        } catch (QueryException $e) {
            Log::error('Erreur lors de la mise à jour de l\'hôtel ID ' . $id . ': ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de l\'hôtel. Vérifiez les données fournies.',
                'status_code' => 500,
            ], 500);
        } catch (\Exception $e) {
            Log::error('Erreur inattendue lors de la mise à jour de l\'hôtel ID ' . $id . ': ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Une erreur inattendue s\'est produite lors de la mise à jour de l\'hôtel',
                'status_code' => 500,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id):JsonResponse
    {
       try {
            if (!is_numeric($id) || $id <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'ID d\'hôtel invalide',
                    'status_code' => 400,
                ], 400);
            }

            $hotel = Hotel::findOrFail($id);
            $hotel->delete();

            return response()->json([
                'success' => true,
                'message' => 'Hôtel supprimé avec succès',
                'status_code' => 200,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hôtel non trouvé',
                'status_code' => 404,
            ], 404);
        } catch (QueryException $e) {
            Log::error('Erreur lors de la suppression de l\'hôtel ID ' . $id . ': ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de l\'hôtel. L\'hôtel pourrait être référencé par d\'autres données.',
                'status_code' => 500,
            ], 500);
        } catch (\Exception $e) {
            Log::error('Erreur inattendue lors de la suppression de l\'hôtel ID ' . $id . ': ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Une erreur inattendue s\'est produite lors de la suppression de l\'hôtel',
                'status_code' => 500,
            ], 500);
        }
    }
}
