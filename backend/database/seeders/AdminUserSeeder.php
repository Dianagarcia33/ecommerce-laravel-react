<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@tienda.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        echo "Usuario admin creado exitosamente\n";
        echo "Email: admin@tienda.com\n";
        echo "Password: admin123\n";
    }
}
