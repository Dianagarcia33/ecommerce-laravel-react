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

        $categories->each(function ($category) {
            if ($category->image_url) {
                $category->image_url = url('storage/' . $category->image_url);
            }
        });

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
            'image' => 'required|string',
        ]);

        // Generar slug automáticamente
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        // Guardar imagen
        $originalName = $request->file('image')->getClientOriginalName();
        $basename = pathinfo($originalName, PATHINFO_FILENAME);
        $cleanName = preg_replace('/[^A-Za-z0-9\-]/', '_', $basename);
        $cleanName = strtolower(trim($cleanName, '_'));
        $filename = $cleanName . '_' . time() . '.' . $request->file('image')->getClientOriginalExtension();

        $path = $request->file('image')->storeAs('categories', $filename, 'public');

        $validated['image_url'] = $path;

        $category = Category::create($validated);

        $category->image_url = url('storage/' . $category->image_url);

        return response()->json($category, 201);
    }

    public function show(string $id)
    {
        $category = Category::with('products')->findOrFail($id);

        if ($category->image_url) {
            $category->image_url = url('storage/' . $category->image_url);
        }

        return response()->json($category);
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        // Generar slug si se actualiza el nombre
        if (isset($validated['name'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        // Si hay una nueva imagen, eliminar la anterior y guardar la nueva
        if ($request->hasFile('image')) {
            // Eliminar la imagen anterior si existe
            if ($category->image_url && Storage::disk('public')->exists($category->image_url)) {
                Storage::disk('public')->delete($category->image_url);
            }

            // Guardar la nueva
            $originalName = $request->file('image')->getClientOriginalName();
            $basename = pathinfo($originalName, PATHINFO_FILENAME);
            $cleanName = preg_replace('/[^A-Za-z0-9\-]/', '_', $basename);
            $cleanName = strtolower(trim($cleanName, '_'));
            $filename = $cleanName . '_' . time() . '.' . $request->file('image')->getClientOriginalExtension();

            $path = $request->file('image')->storeAs('categories', $filename, 'public');
            $validated['image_url'] = $path;
        }

        $category->update($validated);

        // Agregar URL pública
        if ($category->image_url) {
            $category->image_url = url('storage/' . $category->image_url);
        }

        return response()->json($category);
    }

    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);

        // Eliminar imagen física si existe
        if ($category->image_url && Storage::disk('public')->exists($category->image_url)) {
            Storage::disk('public')->delete($category->image_url);
        }

        $category->delete();
        return response()->json(null, 204);
    }
}
