<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Product;
use App\Models\User;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();
        $users = User::where('role', 'user')->get();

        if ($users->isEmpty()) {
            $this->command->warn('No hay usuarios clientes. Creando algunos...');
            $users = collect([
                User::create([
                    'name' => 'María García',
                    'email' => 'maria@example.com',
                    'password' => bcrypt('password'),
                    'role' => 'user'
                ]),
                User::create([
                    'name' => 'Juan Pérez',
                    'email' => 'juan@example.com',
                    'password' => bcrypt('password'),
                    'role' => 'user'
                ]),
                User::create([
                    'name' => 'Ana Martínez',
                    'email' => 'ana@example.com',
                    'password' => bcrypt('password'),
                    'role' => 'user'
                ]),
                User::create([
                    'name' => 'Carlos López',
                    'email' => 'carlos@example.com',
                    'password' => bcrypt('password'),
                    'role' => 'user'
                ]),
                User::create([
                    'name' => 'Laura Rodríguez',
                    'email' => 'laura@example.com',
                    'password' => bcrypt('password'),
                    'role' => 'user'
                ])
            ]);
        }

        $reviews = [
            [
                'rating' => 5,
                'title' => '¡Excelente producto!',
                'comment' => 'Superó mis expectativas. La calidad es excepcional y llegó en perfecto estado. Lo recomiendo totalmente, vale cada peso invertido.'
            ],
            [
                'rating' => 5,
                'title' => 'Muy satisfecho con la compra',
                'comment' => 'El producto es justo como se describe. La entrega fue rápida y el empaquetado muy cuidadoso. Sin duda volveré a comprar aquí.'
            ],
            [
                'rating' => 4,
                'title' => 'Buena relación calidad-precio',
                'comment' => 'Estoy contento con mi compra. El producto cumple con lo esperado, aunque el envío tardó un poco más de lo previsto. Aún así, lo recomiendo.'
            ],
            [
                'rating' => 5,
                'title' => 'Increíble calidad',
                'comment' => 'No puedo estar más feliz con esta compra. Los materiales son de primera calidad y se nota la atención al detalle. ¡Totalmente recomendado!'
            ],
            [
                'rating' => 4,
                'title' => 'Muy bueno',
                'comment' => 'El producto es muy bueno, justo lo que buscaba. La única pega es que me hubiera gustado más opciones de color, pero en general estoy muy satisfecho.'
            ],
            [
                'rating' => 5,
                'title' => 'Perfecto para lo que necesitaba',
                'comment' => 'Llevaba tiempo buscando algo así y finalmente lo encontré. Funciona perfectamente y la calidad es superior a otros productos similares que he probado.'
            ],
            [
                'rating' => 3,
                'title' => 'Cumple pero sin más',
                'comment' => 'El producto está bien, hace lo que promete. Sin embargo, esperaba un poco más por el precio. No está mal, pero tampoco me ha sorprendido.'
            ],
            [
                'rating' => 5,
                'title' => '¡Me encanta!',
                'comment' => 'Estoy enamorada de este producto. Es exactamente lo que esperaba y más. El diseño es precioso y la funcionalidad impecable. Compra totalmente acertada.'
            ],
            [
                'rating' => 4,
                'title' => 'Recomendable',
                'comment' => 'Buen producto en general. Tiene algunos detalles menores mejorables, pero nada que afecte su funcionalidad principal. Lo volvería a comprar.'
            ],
            [
                'rating' => 5,
                'title' => 'Superó expectativas',
                'comment' => 'Compré este producto con ciertas dudas, pero me ha sorprendido gratamente. Es mucho mejor de lo que imaginaba. El servicio al cliente también excelente.'
            ]
        ];

        foreach ($products as $product) {
            // Generar entre 3 y 5 reseñas por producto (uno por cada usuario)
            $numReviews = rand(3, 5);
            
            // Mezclar usuarios para asegurar variedad
            $shuffledUsers = $users->shuffle();
            
            for ($i = 0; $i < min($numReviews, $users->count()); $i++) {
                $user = $shuffledUsers[$i];
                $randomReview = $reviews[array_rand($reviews)];
                
                Review::create([
                    'product_id' => $product->id,
                    'user_id' => $user->id,
                    'rating' => $randomReview['rating'],
                    'title' => $randomReview['title'],
                    'comment' => $randomReview['comment'],
                    'verified_purchase' => rand(0, 1) === 1,
                    'is_approved' => true,
                ]);
            }
        }

        $this->command->info('Reseñas creadas exitosamente!');
    }
}
