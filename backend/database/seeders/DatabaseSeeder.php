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
        // Crear usuario de prueba
           User::create([
            'name' => 'Administrador',
            'email' => 'admin@tienda.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);


        // Crear categorías
        $electronica = Category::create([
            'name' => 'Electrónica',
            'slug' => 'electronica',
            'description' => 'Dispositivos y gadgets electrónicos'
        ]);

        $ropa = Category::create([
            'name' => 'Ropa',
            'slug' => 'ropa',
            'description' => 'Ropa y accesorios de moda'
        ]);

        $hogar = Category::create([
            'name' => 'Hogar',
            'slug' => 'hogar',
            'description' => 'Artículos para el hogar'
        ]);

        // Crear productos de Electrónica
        Product::create([
            'category_id' => $electronica->id,
            'name' => 'Laptop HP 15"',
            'slug' => 'laptop-hp-15',
            'description' => 'Laptop HP con procesador Intel Core i5, 8GB RAM, 256GB SSD',
            'price' => 599.99,
            'stock' => 10,
            'image' => 'https://via.placeholder.com/300x300?text=Laptop+HP'
        ]);

        Product::create([
            'category_id' => $electronica->id,
            'name' => 'Mouse Inalámbrico Logitech',
            'slug' => 'mouse-logitech',
            'description' => 'Mouse inalámbrico ergonómico con batería de larga duración',
            'price' => 29.99,
            'stock' => 50,
            'image' => 'https://via.placeholder.com/300x300?text=Mouse+Logitech'
        ]);

        Product::create([
            'category_id' => $electronica->id,
            'name' => 'Teclado Mecánico RGB',
            'slug' => 'teclado-mecanico-rgb',
            'description' => 'Teclado mecánico gaming con iluminación RGB personalizable',
            'price' => 89.99,
            'stock' => 25,
            'image' => 'https://via.placeholder.com/300x300?text=Teclado+RGB'
        ]);

        // Crear productos de Ropa
        Product::create([
            'category_id' => $ropa->id,
            'name' => 'Camiseta Básica Blanca',
            'slug' => 'camiseta-basica-blanca',
            'description' => 'Camiseta 100% algodón, cómoda y versátil',
            'price' => 19.99,
            'stock' => 100,
            'image' => 'https://via.placeholder.com/300x300?text=Camiseta+Blanca'
        ]);

        Product::create([
            'category_id' => $ropa->id,
            'name' => 'Jeans Slim Fit',
            'slug' => 'jeans-slim-fit',
            'description' => 'Jeans de corte slim fit, estilo moderno',
            'price' => 49.99,
            'stock' => 60,
            'image' => 'https://via.placeholder.com/300x300?text=Jeans'
        ]);

        Product::create([
            'category_id' => $ropa->id,
            'name' => 'Chaqueta de Cuero',
            'slug' => 'chaqueta-cuero',
            'description' => 'Chaqueta de cuero sintético, estilo casual',
            'price' => 129.99,
            'stock' => 15,
            'image' => 'https://via.placeholder.com/300x300?text=Chaqueta'
        ]);

        // Crear productos de Hogar
        Product::create([
            'category_id' => $hogar->id,
            'name' => 'Lámpara de Mesa LED',
            'slug' => 'lampara-mesa-led',
            'description' => 'Lámpara LED ajustable con control táctil',
            'price' => 34.99,
            'stock' => 40,
            'image' => 'https://via.placeholder.com/300x300?text=Lampara+LED'
        ]);

        Product::create([
            'category_id' => $hogar->id,
            'name' => 'Set de Toallas 6 Piezas',
            'slug' => 'set-toallas-6-piezas',
            'description' => 'Set de toallas 100% algodón, suaves y absorbentes',
            'price' => 39.99,
            'stock' => 30,
            'image' => 'https://via.placeholder.com/300x300?text=Toallas'
        ]);

        Product::create([
            'category_id' => $hogar->id,
            'name' => 'Cafetera Automática',
            'slug' => 'cafetera-automatica',
            'description' => 'Cafetera programable con temporizador y jarra térmica',
            'price' => 79.99,
            'stock' => 20,
            'image' => 'https://via.placeholder.com/300x300?text=Cafetera'
        ]);

        // Crear imágenes para productos
        $this->call(ProductImagesSeeder::class);
    }
}
