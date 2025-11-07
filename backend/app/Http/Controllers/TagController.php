<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Product;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Obtener todos los tags
     */
    public function index()
    {
        $tags = Tag::withCount('products')
            ->orderBy('name')
            ->get();
            
        return response()->json($tags);
    }

    /**
     * Obtener productos por tag
     */
    public function products($slug)
    {
        $tag = Tag::where('slug', $slug)->firstOrFail();
        
        $products = $tag->products()
            ->with(['category', 'images'])
            ->get();
            
        return response()->json([
            'tag' => $tag,
            'products' => $products
        ]);
    }

    /**
     * Crear nuevo tag (admin)
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tags',
            'description' => 'nullable|string'
        ]);

        $tag = Tag::create([
            'name' => $request->name,
            'slug' => \Str::slug($request->name),
            'description' => $request->description
        ]);

        return response()->json($tag, 201);
    }

    /**
     * Asignar tags a un producto (admin)
     */
    public function attachToProduct(Request $request, Product $product)
    {
        $request->validate([
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'exists:tags,id'
        ]);

        $product->tags()->sync($request->tag_ids);

        return response()->json([
            'message' => 'Tags actualizados correctamente',
            'product' => $product->load('tags')
        ]);
    }

    /**
     * Búsqueda avanzada de productos usando tags con normalización y fuzzy search
     */
    public function searchProducts(Request $request)
    {
        $query = $request->input('q', '');
        
        if (empty($query)) {
            return response()->json([]);
        }

        // Normalizar el término de búsqueda (quitar tildes, minúsculas, etc)
        $normalizedQuery = $this->normalizeText($query);
        $searchTerms = explode(' ', $normalizedQuery);
        
        // Diccionario de sinónimos y términos relacionados
        $synonyms = [
            'deportivo' => ['deporte', 'sport', 'running', 'gym', 'fitness', 'atletico'],
            'casual' => ['informal', 'comodo', 'diario', 'everyday'],
            'elegante' => ['formal', 'fino', 'luxury', 'premium', 'exclusivo'],
            'economico' => ['barato', 'oferta', 'descuento', 'rebaja', 'promocion', 'cheap'],
            'nuevo' => ['novedad', 'reciente', 'latest', 'new'],
            'verano' => ['calor', 'playa', 'summer', 'fresco'],
            'invierno' => ['frio', 'abrigado', 'winter', 'caliente'],
            'hombre' => ['masculino', 'caballero', 'men', 'male'],
            'mujer' => ['femenino', 'dama', 'women', 'female'],
            'negro' => ['black', 'oscuro'],
            'blanco' => ['white', 'claro'],
            'rojo' => ['red', 'carmesi'],
            'azul' => ['blue', 'marino'],
            'verde' => ['green'],
            'cuero' => ['piel', 'leather'],
            'algodon' => ['cotton', 'tela'],
            'impermeable' => ['waterproof', 'resistente agua'],
            'ligero' => ['light', 'liviano'],
        ];

        // Expandir búsqueda con sinónimos
        $expandedTerms = [];
        foreach ($searchTerms as $term) {
            $expandedTerms[] = $term;
            foreach ($synonyms as $key => $values) {
                if ($term === $key || in_array($term, $values)) {
                    $expandedTerms = array_merge($expandedTerms, [$key], $values);
                }
            }
        }
        $expandedTerms = array_unique($expandedTerms);

        // Buscar productos con sistema de scoring
        $products = Product::with(['category', 'images', 'tags'])
            ->get()
            ->map(function($product) use ($normalizedQuery, $searchTerms, $expandedTerms) {
                $score = 0;
                
                // Normalizar campos del producto
                $productName = $this->normalizeText($product->name);
                $productDesc = $this->normalizeText($product->description ?? '');
                $categoryName = $this->normalizeText($product->category->name ?? '');
                $tagNames = $product->tags->pluck('name')->map(fn($t) => $this->normalizeText($t))->toArray();
                
                // Búsqueda exacta en nombre (máxima prioridad)
                if ($productName === $normalizedQuery) $score += 100;
                
                // Nombre comienza con el término
                if (str_starts_with($productName, $normalizedQuery)) $score += 80;
                
                // Nombre contiene el término completo
                if (str_contains($productName, $normalizedQuery)) $score += 50;
                
                // Búsqueda en tags (alta prioridad)
                foreach ($tagNames as $tagName) {
                    if ($tagName === $normalizedQuery) $score += 90;
                    if (str_contains($tagName, $normalizedQuery)) $score += 60;
                    
                    // Búsqueda por términos individuales en tags
                    foreach ($searchTerms as $term) {
                        if (strlen($term) > 2 && str_contains($tagName, $term)) {
                            $score += 40;
                        }
                    }
                    
                    // Búsqueda con sinónimos en tags
                    foreach ($expandedTerms as $expandedTerm) {
                        if (strlen($expandedTerm) > 2 && str_contains($tagName, $expandedTerm)) {
                            $score += 35;
                        }
                    }
                }
                
                // Búsqueda por palabras individuales
                foreach ($searchTerms as $term) {
                    if (strlen($term) > 2) {
                        if (str_contains($productName, $term)) $score += 30;
                        if (str_contains($productDesc, $term)) $score += 15;
                        if (str_contains($categoryName, $term)) $score += 25;
                    }
                }
                
                // Búsqueda con términos expandidos (sinónimos)
                foreach ($expandedTerms as $expandedTerm) {
                    if (strlen($expandedTerm) > 2) {
                        if (str_contains($productName, $expandedTerm)) $score += 25;
                        if (str_contains($productDesc, $expandedTerm)) $score += 12;
                        if (str_contains($categoryName, $expandedTerm)) $score += 20;
                    }
                }
                
                // Categoría exacta
                if ($categoryName === $normalizedQuery) $score += 70;
                if (str_contains($categoryName, $normalizedQuery)) $score += 35;
                
                // Descripción contiene el término
                if (str_contains($productDesc, $normalizedQuery)) $score += 20;
                
                // Búsqueda difusa (tolerancia a errores)
                $similarity = $this->calculateSimilarity($normalizedQuery, $productName);
                if ($similarity > 0.7) $score += $similarity * 40;
                
                // Búsqueda difusa en tags
                foreach ($tagNames as $tagName) {
                    $tagSimilarity = $this->calculateSimilarity($normalizedQuery, $tagName);
                    if ($tagSimilarity > 0.7) $score += $tagSimilarity * 35;
                }
                
                $product->relevance_score = $score;
                return $product;
            })
            ->filter(fn($product) => $product->relevance_score > 0)
            ->sortByDesc('relevance_score')
            ->take(15)
            ->values();

        return response()->json($products);
    }

    /**
     * Normalizar texto para búsqueda (quitar tildes, convertir a minúsculas, etc)
     */
    private function normalizeText($text)
    {
        if (empty($text)) return '';
        
        $text = strtolower($text);
        
        // Quitar tildes
        $unwanted = [
            'á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u',
            'Á' => 'a', 'É' => 'e', 'Í' => 'i', 'Ó' => 'o', 'Ú' => 'u',
            'ñ' => 'n', 'Ñ' => 'n', 'ü' => 'u', 'Ü' => 'u'
        ];
        
        $text = strtr($text, $unwanted);
        
        // Quitar caracteres especiales excepto espacios
        $text = preg_replace('/[^a-z0-9\s]/', '', $text);
        
        // Normalizar espacios múltiples
        $text = preg_replace('/\s+/', ' ', trim($text));
        
        return $text;
    }

    /**
     * Calcular similitud entre dos strings usando Levenshtein
     */
    private function calculateSimilarity($str1, $str2)
    {
        $longer = strlen($str1) > strlen($str2) ? $str1 : $str2;
        $shorter = strlen($str1) > strlen($str2) ? $str2 : $str1;
        
        if (strlen($longer) === 0) return 1.0;
        
        $distance = levenshtein($shorter, $longer);
        return (strlen($longer) - $distance) / strlen($longer);
    }
}
