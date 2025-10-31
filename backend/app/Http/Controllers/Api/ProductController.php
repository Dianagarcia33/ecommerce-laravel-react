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
        return response()->json($products);

        $products->each(function($product) {
        if ($product->image) {
            $product->image_url = url('storage/products/' . $product->image);
        }
    });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255|unique:products',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            // 'image' => 'nullable|file|image|max:2048',
        ]);

        // Generar slug automáticamente
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $path = $request->file('image');
            $originalname = $path->getClientOriginalName();
            $extension = $path->getClientOriginalExtension();
            $namesinextension = pathinfo($originalname, PATHINFO_FILENAME);
            $clientname = preg_replace('/[^A-Za-z0-9\-]/', '_', $namesinextension); 
            $clientname = preg_replace('/_+/', '_', $clientname);
            $clientname = trim($clientname, '_');
            $clientname = strtolower($clientname);
            $filename = $clientname . '_' . time() . '.' . $extension;
            $path = $request->file('image')->storeAs('products', $filename, 'public');
            $validated['image'] = $path;
        }

        $product = Product::create($validated);
        return response()->json($product->load('category'), 201);
    }

    public function show(string $id)
    {
        $product = Product::with('category')->findOrFail($id);
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
            'image' => 'nullable|file|image|max:2048',
        ]);

        // Generar slug si se actualiza el nombre
        if (isset($validated['name'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image');
            $originalname = $path->getClientOriginalName();
            $extension = $path->getClientOriginalExtension();
            $namesinextension = pathinfo($originalname, PATHINFO_FILENAME);
            $clientname = preg_replace('/[^A-Za-z0-9\-]/', '_', $namesinextension); 
            $clientname = preg_replace('/_+/', '_', $clientname);
            $clientname = trim($clientname, '_');
            $clientname = strtolower($clientname);
            $filename = $clientname . '_' . time() . '.' . $extension;
            $path = $request->file('image')->storeAs('products', $filename, 'public');
            $validated['image'] = $path;
        }

        $product->update($validated);
        return response()->json($product->load('category'));
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(null, 204);
    }
}
