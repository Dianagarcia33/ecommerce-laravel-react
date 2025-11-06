<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images']);

        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        $products = $query->get();

        $products->each(function($product) {
            $product->images->each(function($image) {
                $image->image_url = url('storage/' . $image->image_url);
            });
        });

        return response()->json($products);

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255|unique:products',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'images.*' => 'required|image|max:2048',
        ]);

        // Generar slug automáticamente
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        $product = Product::create($validated);

        // Guardar las imágenes
        foreach ($request->file('images') as $index => $image) {
            $originalname = $image->getClientOriginalName();
            $extension = $image->getClientOriginalExtension();
            $basename = pathinfo($originalname, PATHINFO_FILENAME);
            $cleanName = preg_replace('/[^A-Za-z0-9\-]/', '_', $basename);
            $cleanName = strtolower(trim($cleanName, '_'));
            $filename = $cleanName . '_' . time() . '.' . $extension;

            $path = $image->storeAs('/products', $filename, 'public');

            $product->images()->create([
                'image_url' => $path,
                'is_primary' => $index === 0, // Primera imagen como principal
                'order' => $index + 1,
            ]);
        }

        // Recargar el producto con sus relaciones
        $product->load(['category', 'images']);

        // Transformar las URLs de las imágenes
        $product->images->each(function($image) {
            $image->image_url = url('storage/' . $image->image_url);
        });

        return response()->json($product, 201);
    }

    public function show(string $id)
    {
        $product = Product::with(['category', 'images'])->findOrFail($id);

        // Agregar "storage/" automáticamente a las URLs de las imágenes
        $product->images->each(function($image) {
            $image->image_url = url('storage/' . $image->image_url);
        });

        return response()->json($product);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'name' => 'sometimes|string|max:255|unique:products,name,' . $id,
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'images.*' => 'nullable|image|max:2048',
        ]);

        // Generar slug si se actualiza el nombre
        if (isset($validated['name'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        // Actualizar los campos del producto (excepto imágenes)
        $product->update(collect($validated)->except('images')->toArray());

        // Si hay nuevas imágenes, procesarlas
        if ($request->hasFile('images')) {
            // Obtener el orden máximo actual
            $maxOrder = $product->images()->max('order') ?? 0;

            foreach ($request->file('images') as $index => $image) {
                $originalname = $image->getClientOriginalName();
                $extension = $image->getClientOriginalExtension();
                $basename = pathinfo($originalname, PATHINFO_FILENAME);
                $cleanName = preg_replace('/[^A-Za-z0-9\-]/', '_', $basename);
                $cleanName = strtolower(trim($cleanName, '_'));
                $filename = $cleanName . '_' . time() . '_' . $index . '.' . $extension;

                $path = $image->storeAs('products', $filename, 'public');

                $product->images()->create([
                    'image_url' => $path,
                    'is_primary' => $product->images()->count() === 0 && $index === 0, // Primera imagen como principal si no hay otras
                    'order' => $maxOrder + $index + 1,
                ]);
            }
        }

        // Recargar el producto con sus relaciones
        $product->load(['category', 'images']);

        // Transformar las URLs de las imágenes
        $product->images->each(function($image) {
            $image->image_url = url('storage/' . $image->image_url);
        });

        return response()->json($product, 200);
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        foreach ($product->images as $image) {
            \Storage::disk('public')->delete($image->image_url);
            $image->delete();
        }

        $product->delete();
        return response()->json(null, 204);
    }

    /**
     * Delete a specific image from a product
     */
    public function deleteImage(string $productId, string $imageId)
    {
        $product = Product::findOrFail($productId);
        $image = $product->images()->findOrFail($imageId);

        // Eliminar archivo físico
        \Storage::disk('public')->delete($image->image_url);
        
        // Eliminar registro
        $image->delete();

        // Recargar imágenes
        $product->load('images');

        // Transformar las URLs de las imágenes
        $product->images->each(function($image) {
            $image->image_url = url('storage/' . $image->image_url);
        });

        return response()->json([
            'message' => 'Imagen eliminada exitosamente',
            'product' => $product
        ], 200);
    }
}
