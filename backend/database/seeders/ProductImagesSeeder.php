<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();

        foreach ($products as $product) {
            // Crear 3-5 imágenes por producto
            $imageCount = rand(3, 5);
            
            for ($i = 1; $i <= $imageCount; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => "https://via.placeholder.com/800x800?text=Product+{$product->id}+Image+{$i}",
                    'is_primary' => $i === 1, // Primera imagen es la principal
                    'order' => $i,
                ]);
            }
        }
    }
}
