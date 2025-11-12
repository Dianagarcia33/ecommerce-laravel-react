<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Get reviews for a specific product
     */
    public function index($productId)
    {
        $reviews = Review::where('product_id', $productId)
            ->approved()
            ->recent()
            ->with('user:id,name')
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'title' => $review->title,
                    'comment' => $review->comment,
                    'images' => $review->images ?? [], // Incluir imágenes
                    'verified_purchase' => $review->verified_purchase,
                    'user_name' => $review->user->name,
                    'created_at' => $review->created_at->format('d/m/Y'),
                    'created_at_diff' => $review->created_at->diffForHumans(),
                ];
            });

        $product = Product::findOrFail($productId);
        
        return response()->json([
            'reviews' => $reviews,
            'average_rating' => round($product->averageRating(), 1),
            'total_reviews' => $product->reviewsCount(),
            'rating_distribution' => $this->getRatingDistribution($productId)
        ]);
    }

    /**
     * Store a new review
     */
    public function store(Request $request, $productId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'nullable|string|max:255',
            'comment' => 'required|string|min:10|max:1000',
            'images' => 'nullable|array|max:5', // Máximo 5 imágenes
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', // Máximo 5MB por imagen
        ]);

        // Verificar que el producto existe
        $product = Product::findOrFail($productId);

        // Verificar que el usuario haya comprado el producto
        $hasPurchased = $this->checkVerifiedPurchase(Auth::id(), $productId);
        
        if (!$hasPurchased) {
            return response()->json([
                'message' => 'Solo puedes dejar una reseña si has comprado este producto'
            ], 403);
        }

        // Verificar que el usuario no haya dejado ya una reseña
        $existingReview = Review::where('product_id', $productId)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingReview) {
            return response()->json([
                'message' => 'Ya has dejado una reseña para este producto'
            ], 422);
        }

        // Como ya verificamos la compra, es siempre verificada
        $verifiedPurchase = true;

        // Procesar imágenes si existen
        $imageUrls = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $imageUrls[] = '/storage/' . $path;
            }
        }

        $review = Review::create([
            'product_id' => $productId,
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'images' => $imageUrls, // Guardar array de URLs
            'verified_purchase' => $verifiedPurchase,
            'is_approved' => true,
        ]);

        return response()->json([
            'message' => 'Reseña creada exitosamente',
            'review' => [
                'id' => $review->id,
                'rating' => $review->rating,
                'title' => $review->title,
                'comment' => $review->comment,
                'images' => $review->images,
                'verified_purchase' => $review->verified_purchase,
                'user_name' => Auth::user()->name,
                'created_at' => $review->created_at->format('d/m/Y'),
                'created_at_diff' => $review->created_at->diffForHumans(),
            ]
        ], 201);
    }

    /**
     * Update a review
     */
    public function update(Request $request, $reviewId)
    {
        $review = Review::findOrFail($reviewId);

        if ($review->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'No tienes permiso para editar esta reseña'
            ], 403);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'nullable|string|max:255',
            'comment' => 'required|string|min:10|max:1000',
        ]);

        $review->update([
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'message' => 'Reseña actualizada exitosamente',
            'review' => $review
        ]);
    }

    /**
     * Delete a review
     */
    public function destroy($reviewId)
    {
        $review = Review::findOrFail($reviewId);

        if ($review->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'No tienes permiso para eliminar esta reseña'
            ], 403);
        }

        $review->delete();

        return response()->json([
            'message' => 'Reseña eliminada exitosamente'
        ]);
    }

    /**
     * Get rating distribution
     */
    private function getRatingDistribution($productId)
    {
        $distribution = [];
        
        for ($i = 5; $i >= 1; $i--) {
            $count = Review::where('product_id', $productId)
                ->where('is_approved', true)
                ->where('rating', $i)
                ->count();
            
            $distribution[] = [
                'rating' => $i,
                'count' => $count,
            ];
        }

        return $distribution;
    }

    /**
     * Check if user has purchased this product
     */
    private function checkVerifiedPurchase($userId, $productId)
    {
        return \DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.user_id', $userId)
            ->where('order_items.product_id', $productId)
            ->where('orders.status', 'completed')
            ->exists();
    }

    /**
     * Get user's review for a product
     */
    public function getUserReview($productId)
    {
        $review = Review::where('product_id', $productId)
            ->where('user_id', Auth::id())
            ->first();

        if (!$review) {
            return response()->json(['review' => null]);
        }

        return response()->json([
            'review' => [
                'id' => $review->id,
                'rating' => $review->rating,
                'title' => $review->title,
                'comment' => $review->comment,
                'verified_purchase' => $review->verified_purchase,
                'created_at' => $review->created_at->format('d/m/Y'),
            ]
        ]);
    }

    /**
     * Check if user can review this product
     */
    public function canReview($productId)
    {
        // Verificar que el producto existe
        $product = Product::findOrFail($productId);

        // Verificar si el usuario ya dejó una reseña
        $existingReview = Review::where('product_id', $productId)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingReview) {
            return response()->json([
                'can_review' => false,
                'reason' => 'already_reviewed',
                'message' => 'Ya has dejado una reseña para este producto'
            ]);
        }

        // Verificar si el usuario ha comprado el producto
        $hasPurchased = $this->checkVerifiedPurchase(Auth::id(), $productId);

        if (!$hasPurchased) {
            return response()->json([
                'can_review' => false,
                'reason' => 'not_purchased',
                'message' => 'Solo puedes dejar una reseña si has comprado este producto'
            ]);
        }

        return response()->json([
            'can_review' => true,
            'message' => 'Puedes dejar una reseña'
        ]);
    }
}
