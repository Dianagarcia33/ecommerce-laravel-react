<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Crear usuario administrador
        $this->call(AdminUserSeeder::class);

        // Crear categorías
        $electronica = Category::create([
            'name' => 'Electrónica',
            'slug' => 'electronica',
            'description' => 'Dispositivos y gadgets electrónicos',
            'image_url' => 'categories/electronica.jpg',
        ]);

        $ropa = Category::create([
            'name' => 'Ropa',
            'slug' => 'ropa',
            'description' => 'Ropa y accesorios de moda',
            'image_url' => 'categories/ropa.jpg',
        ]);

        $hogar = Category::create([
            'name' => 'Hogar',
            'slug' => 'hogar',
            'description' => 'Artículos para el hogar',
            'image_url' => 'categories/hogar.jpg',
        ]);

        // Crear productos de Electrónica
        Product::create([
            'category_id' => $electronica->id,
            'name' => 'Laptop HP 15"',
            'slug' => 'laptop-hp-15',
            'description' => 'Laptop HP con procesador Intel Core i5, 8GB RAM, 256GB SSD',
            'price' => 599.99,
            'stock' => 10,
        ]);

        Product::create([
            'category_id' => $electronica->id,
            'name' => 'Mouse Inalámbrico Logitech',
            'slug' => 'mouse-logitech',
            'description' => 'Mouse inalámbrico ergonómico con batería de larga duración',
            'price' => 29.99,
            'stock' => 50,
        ]);

        Product::create([
            'category_id' => $electronica->id,
            'name' => 'Teclado Mecánico RGB',
            'slug' => 'teclado-mecanico-rgb',
            'description' => 'Teclado mecánico gaming con iluminación RGB personalizable',
            'price' => 89.99,
            'stock' => 25,
        ]);

        // Crear productos de Ropa
        Product::create([
            'category_id' => $ropa->id,
            'name' => 'Camiseta Básica Blanca',
            'slug' => 'camiseta-basica-blanca',
            'description' => 'Camiseta 100% algodón, cómoda y versátil',
            'price' => 19.99,
            'stock' => 100,
        ]);

        Product::create([
            'category_id' => $ropa->id,
            'name' => 'Jeans Slim Fit',
            'slug' => 'jeans-slim-fit',
            'description' => 'Jeans de corte slim fit, estilo moderno',
            'price' => 49.99,
            'stock' => 60,
        ]);

        Product::create([
            'category_id' => $ropa->id,
            'name' => 'Chaqueta de Cuero',
            'slug' => 'chaqueta-cuero',
            'description' => 'Chaqueta de cuero sintético, estilo casual',
            'price' => 129.99,
            'stock' => 15,
        ]);

        // Crear productos de Hogar
        Product::create([
            'category_id' => $hogar->id,
            'name' => 'Lámpara de Mesa LED',
            'slug' => 'lampara-mesa-led',
            'description' => 'Lámpara LED ajustable con control táctil',
            'price' => 34.99,
            'stock' => 40,
        ]);

        Product::create([
            'category_id' => $hogar->id,
            'name' => 'Set de Toallas 6 Piezas',
            'slug' => 'set-toallas-6-piezas',
            'description' => 'Set de toallas 100% algodón, suaves y absorbentes',
            'price' => 39.99,
            'stock' => 30,
        ]);

        Product::create([
            'category_id' => $hogar->id,
            'name' => 'Cafetera Automática',
            'slug' => 'cafetera-automatica',
            'description' => 'Cafetera programable con temporizador y jarra térmica',
            'price' => 79.99,
            'stock' => 20,
        ]);

        // 2. Crear imágenes para productos
        $this->call(ProductImagesSeeder::class);

        // 3. Crear tags
        $this->call(TagSeeder::class);

        // 4. Asignar tags a productos
        $this->call(AssignTagsSeeder::class);

        // 5. Crear datos de prueba del dashboard
        $this->call(DashboardTestDataSeeder::class);

        // 6. Crear plantillas de email
        $this->call(EmailTemplateSeeder::class);

        // 7. Crear reseñas de productos
        $this->call(ReviewSeeder::class);
    }
}
