<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Carbon\Carbon;

class DashboardTestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asegurarse de que existen categorías y productos
        if (Category::count() === 0) {
            $categories = [
                ['name' => 'Electrónicos', 'description' => 'Dispositivos y gadgets'],
                ['name' => 'Ropa', 'description' => 'Moda y accesorios'],
                ['name' => 'Hogar', 'description' => 'Artículos para el hogar'],
                ['name' => 'Deportes', 'description' => 'Equipamiento deportivo'],
            ];

            foreach ($categories as $category) {
                Category::create($category);
            }
        }

        if (Product::count() === 0) {
            $categories = Category::all();
            $products = [
                ['name' => 'Laptop HP', 'price' => 15000, 'stock' => 15, 'category_id' => $categories[0]->id],
                ['name' => 'Mouse Logitech', 'price' => 350, 'stock' => 50, 'category_id' => $categories[0]->id],
                ['name' => 'Teclado Mecánico', 'price' => 1200, 'stock' => 8, 'category_id' => $categories[0]->id],
                ['name' => 'Camiseta Deportiva', 'price' => 250, 'stock' => 100, 'category_id' => $categories[1]->id],
                ['name' => 'Jeans', 'price' => 650, 'stock' => 45, 'category_id' => $categories[1]->id],
                ['name' => 'Licuadora', 'price' => 800, 'stock' => 5, 'category_id' => $categories[2]->id],
                ['name' => 'Cafetera', 'price' => 1200, 'stock' => 3, 'category_id' => $categories[2]->id],
                ['name' => 'Balón de Fútbol', 'price' => 450, 'stock' => 25, 'category_id' => $categories[3]->id],
                ['name' => 'Raqueta de Tenis', 'price' => 2500, 'stock' => 2, 'category_id' => $categories[3]->id],
            ];

            foreach ($products as $product) {
                Product::create(array_merge($product, [
                    'description' => 'Producto de prueba para el dashboard',
                    'image' => 'https://via.placeholder.com/300'
                ]));
            }
        }

        // Crear usuarios de prueba si no existen
        $users = User::where('role', 'user')->take(3)->get();
        if ($users->count() === 0) {
            for ($i = 1; $i <= 3; $i++) {
                $users[] = User::create([
                    'name' => "Cliente $i",
                    'email' => "cliente$i@test.com",
                    'password' => bcrypt('password'),
                    'role' => 'user',
                ]);
            }
            $users = collect($users);
        }

        // Generar órdenes de los últimos 30 días
        $products = Product::all();
        $statuses = ['pending', 'completed', 'completed', 'completed', 'cancelled']; // Más completadas para stats

        for ($i = 0; $i < 30; $i++) {
            $date = Carbon::now()->subDays(rand(0, 30));
            
            // Crear 1-3 órdenes por día
            $ordersPerDay = rand(1, 3);
            
            for ($j = 0; $j < $ordersPerDay; $j++) {
                $user = $users->random();
                $status = $statuses[array_rand($statuses)];
                
                // Crear orden
                $order = Order::create([
                    'user_id' => $user->id,
                    'customer_name' => $user->name,
                    'customer_email' => $user->email,
                    'customer_phone' => '555-' . rand(1000, 9999),
                    'shipping_address' => 'Dirección de prueba #' . rand(100, 999),
                    'status' => $status,
                    'total' => 0, // Se calculará después
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);

                // Agregar 1-4 items a la orden
                $itemCount = rand(1, 4);
                $orderTotal = 0;

                for ($k = 0; $k < $itemCount; $k++) {
                    $product = $products->random();
                    $quantity = rand(1, 3);
                    $price = $product->price;
                    
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $price,
                        'created_at' => $date,
                        'updated_at' => $date,
                    ]);

                    $orderTotal += $price * $quantity;
                }

                // Actualizar total de la orden
                $order->update(['total' => $orderTotal]);
            }
        }

        $this->command->info('✅ Datos de prueba para el dashboard creados exitosamente!');
        $this->command->info('📊 Órdenes creadas: ' . Order::count());
        $this->command->info('💰 Ingresos totales: $' . Order::where('status', 'completed')->sum('total'));
    }
}
