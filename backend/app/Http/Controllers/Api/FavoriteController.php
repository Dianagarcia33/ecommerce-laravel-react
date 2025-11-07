<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Get user's favorites
     */
    public function index(Request $request)
    {
        $favorites = $request->user()
            ->favoriteProducts()
            ->with(['category', 'images'])
            ->get();

        // Transformar URLs de imágenes
        $favorites->each(function($product) {
            $product->images->each(function($image) {
                $image->image_url = url('storage/' . $image->image_url);
            });
        });

        return response()->json($favorites);
    }

    /**
     * Add product to favorites
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $favorite = Favorite::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id
        ]);

        return response()->json([
            'message' => 'Producto agregado a favoritos',
            'favorite' => $favorite
        ], 201);
    }

    /**
     * Remove product from favorites
     */
    public function destroy(Request $request, $productId)
    {
        $deleted = Favorite::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'Producto eliminado de favoritos'
            ]);
        }

        return response()->json([
            'message' => 'Producto no encontrado en favoritos'
        ], 404);
    }

    /**
     * Toggle favorite status
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $favorite = Favorite::where('user_id', $request->user()->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json([
                'message' => 'Producto eliminado de favoritos',
                'is_favorite' => false
            ]);
        } else {
            Favorite::create([
                'user_id' => $request->user()->id,
                'product_id' => $request->product_id
            ]);
            return response()->json([
                'message' => 'Producto agregado a favoritos',
                'is_favorite' => true
            ]);
        }
    }

    /**
     * Check if product is favorite
     */
    public function check(Request $request, $productId)
    {
        $isFavorite = Favorite::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->exists();

        return response()->json([
            'is_favorite' => $isFavorite
        ]);
    }
}
