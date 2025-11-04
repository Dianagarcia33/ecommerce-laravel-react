<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
        ]);

        // Generar slug automáticamente
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    public function show(string $id)
    {
        $category = Category::with('products')->findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string',
        ]);

        // Generar slug si se actualiza el nombre
        if (isset($validated['name'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        $category->update($validated);
        return response()->json($category);
    }

    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
