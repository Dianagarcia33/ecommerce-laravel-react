<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            // Estilos
            ['name' => 'Casual', 'description' => 'Productos para uso diario y casual'],
            ['name' => 'Deportivo', 'description' => 'Productos para actividades deportivas'],
            ['name' => 'Elegante', 'description' => 'Productos elegantes y formales'],
            ['name' => 'Moderno', 'description' => 'Productos con diseño moderno'],
            ['name' => 'Clásico', 'description' => 'Productos de estilo clásico'],
            ['name' => 'Vintage', 'description' => 'Productos de estilo retro'],
            
            // Temporadas
            ['name' => 'Verano', 'description' => 'Ideal para temporada de verano'],
            ['name' => 'Invierno', 'description' => 'Ideal para temporada de invierno'],
            ['name' => 'Primavera', 'description' => 'Ideal para primavera'],
            ['name' => 'Otoño', 'description' => 'Ideal para otoño'],
            
            // Características
            ['name' => 'Nuevo', 'description' => 'Productos recién llegados'],
            ['name' => 'Oferta', 'description' => 'Productos en oferta especial'],
            ['name' => 'Tendencia', 'description' => 'Productos en tendencia'],
            ['name' => 'Bestseller', 'description' => 'Productos más vendidos'],
            ['name' => 'Premium', 'description' => 'Productos de alta gama'],
            ['name' => 'Económico', 'description' => 'Productos económicos'],
            
            // Materiales (ejemplo)
            ['name' => 'Algodón', 'description' => 'Productos de algodón'],
            ['name' => 'Cuero', 'description' => 'Productos de cuero'],
            ['name' => 'Sintético', 'description' => 'Materiales sintéticos'],
            ['name' => 'Ecológico', 'description' => 'Productos ecológicos'],
            
            // Colores principales
            ['name' => 'Negro', 'description' => 'Productos en color negro'],
            ['name' => 'Blanco', 'description' => 'Productos en color blanco'],
            ['name' => 'Rojo', 'description' => 'Productos en color rojo'],
            ['name' => 'Azul', 'description' => 'Productos en color azul'],
            ['name' => 'Verde', 'description' => 'Productos en color verde'],
            
            // Ocasiones
            ['name' => 'Fiesta', 'description' => 'Para eventos y fiestas'],
            ['name' => 'Trabajo', 'description' => 'Para uso en el trabajo'],
            ['name' => 'Gimnasio', 'description' => 'Para ir al gimnasio'],
            ['name' => 'Playa', 'description' => 'Para la playa'],
            ['name' => 'Montaña', 'description' => 'Para actividades de montaña'],
            
            // Género/Edad
            ['name' => 'Hombre', 'description' => 'Productos para hombre'],
            ['name' => 'Mujer', 'description' => 'Productos para mujer'],
            ['name' => 'Unisex', 'description' => 'Productos unisex'],
            ['name' => 'Niños', 'description' => 'Productos para niños'],
            
            // Tallas/Tamaños
            ['name' => 'Talla Grande', 'description' => 'Tallas grandes disponibles'],
            ['name' => 'Talla Pequeña', 'description' => 'Tallas pequeñas'],
            ['name' => 'Ajustable', 'description' => 'Tamaño ajustable'],
            
            // Funcionalidades
            ['name' => 'Impermeable', 'description' => 'Producto impermeable'],
            ['name' => 'Transpirable', 'description' => 'Material transpirable'],
            ['name' => 'Resistente', 'description' => 'Material resistente'],
            ['name' => 'Ligero', 'description' => 'Producto ligero'],
        ];

        foreach ($tags as $tag) {
            Tag::create([
                'name' => $tag['name'],
                'slug' => Str::slug($tag['name']),
                'description' => $tag['description']
            ]);
        }
    }
}
