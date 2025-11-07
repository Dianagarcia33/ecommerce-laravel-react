<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Tag;

class AssignTagsSeeder extends Seeder
{
    /**
     * Asignar tags automáticamente a productos basándose en su nombre y descripción
     */
    public function run(): void
    {
        $products = Product::all();
        $tags = Tag::all()->keyBy('slug');

        foreach ($products as $product) {
            $productTags = [];
            $name = strtolower($product->name);
            $description = strtolower($product->description ?? '');
            $combinedText = $name . ' ' . $description;

            // Detectar estilos
            if (str_contains($combinedText, 'casual') || str_contains($combinedText, 'diario')) {
                $productTags[] = $tags->get('casual')?->id;
            }
            if (str_contains($combinedText, 'deport') || str_contains($combinedText, 'running') || str_contains($combinedText, 'gym')) {
                $productTags[] = $tags->get('deportivo')?->id;
            }
            if (str_contains($combinedText, 'elegante') || str_contains($combinedText, 'formal')) {
                $productTags[] = $tags->get('elegante')?->id;
            }
            if (str_contains($combinedText, 'moderno')) {
                $productTags[] = $tags->get('moderno')?->id;
            }
            if (str_contains($combinedText, 'clasico') || str_contains($combinedText, 'clásico') || str_contains($combinedText, 'tradicional')) {
                $productTags[] = $tags->get('clasico')?->id;
            }

            // Detectar temporadas
            if (str_contains($combinedText, 'verano') || str_contains($combinedText, 'fresco')) {
                $productTags[] = $tags->get('verano')?->id;
            }
            if (str_contains($combinedText, 'invierno') || str_contains($combinedText, 'abrigado')) {
                $productTags[] = $tags->get('invierno')?->id;
            }

            // Detectar características
            if (str_contains($combinedText, 'nuevo') || str_contains($combinedText, 'nueva')) {
                $productTags[] = $tags->get('nuevo')?->id;
            }
            if (str_contains($combinedText, 'oferta') || str_contains($combinedText, 'descuento')) {
                $productTags[] = $tags->get('oferta')?->id;
            }
            if (str_contains($combinedText, 'premium') || str_contains($combinedText, 'lujo')) {
                $productTags[] = $tags->get('premium')?->id;
            }
            if (str_contains($combinedText, 'economico') || str_contains($combinedText, 'barato')) {
                $productTags[] = $tags->get('economico')?->id;
            }

            // Detectar materiales
            if (str_contains($combinedText, 'algodon') || str_contains($combinedText, 'algodón')) {
                $productTags[] = $tags->get('algodon')?->id;
            }
            if (str_contains($combinedText, 'cuero')) {
                $productTags[] = $tags->get('cuero')?->id;
            }
            if (str_contains($combinedText, 'ecologico') || str_contains($combinedText, 'sostenible')) {
                $productTags[] = $tags->get('ecologico')?->id;
            }

            // Detectar colores
            if (str_contains($combinedText, 'negro') || str_contains($combinedText, 'black')) {
                $productTags[] = $tags->get('negro')?->id;
            }
            if (str_contains($combinedText, 'blanco') || str_contains($combinedText, 'white')) {
                $productTags[] = $tags->get('blanco')?->id;
            }
            if (str_contains($combinedText, 'rojo') || str_contains($combinedText, 'red')) {
                $productTags[] = $tags->get('rojo')?->id;
            }
            if (str_contains($combinedText, 'azul') || str_contains($combinedText, 'blue')) {
                $productTags[] = $tags->get('azul')?->id;
            }
            if (str_contains($combinedText, 'verde') || str_contains($combinedText, 'green')) {
                $productTags[] = $tags->get('verde')?->id;
            }

            // Detectar género
            if (str_contains($combinedText, 'hombre') || str_contains($combinedText, 'masculino') || str_contains($combinedText, 'men')) {
                $productTags[] = $tags->get('hombre')?->id;
            }
            if (str_contains($combinedText, 'mujer') || str_contains($combinedText, 'femenino') || str_contains($combinedText, 'women')) {
                $productTags[] = $tags->get('mujer')?->id;
            }
            if (str_contains($combinedText, 'unisex')) {
                $productTags[] = $tags->get('unisex')?->id;
            }

            // Detectar funcionalidades
            if (str_contains($combinedText, 'impermeable') || str_contains($combinedText, 'waterproof')) {
                $productTags[] = $tags->get('impermeable')?->id;
            }
            if (str_contains($combinedText, 'transpirable') || str_contains($combinedText, 'breathable')) {
                $productTags[] = $tags->get('transpirable')?->id;
            }
            if (str_contains($combinedText, 'ligero') || str_contains($combinedText, 'light')) {
                $productTags[] = $tags->get('ligero')?->id;
            }

            // Asignar tendencia o bestseller basado en stock (ejemplo)
            if ($product->stock < 10) {
                $productTags[] = $tags->get('tendencia')?->id;
            }

            // Filtrar nulls y duplicados
            $productTags = array_filter(array_unique($productTags));

            // Asignar tags al producto
            if (!empty($productTags)) {
                $product->tags()->sync($productTags);
                $this->command->info("Tags asignados a: {$product->name} (" . count($productTags) . " tags)");
            }
        }

        $this->command->info('¡Tags asignados correctamente a todos los productos!');
    }
}
