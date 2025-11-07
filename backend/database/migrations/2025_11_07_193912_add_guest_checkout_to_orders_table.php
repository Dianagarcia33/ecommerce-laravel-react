<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Hacer user_id nullable para permitir compras de invitados
            $table->foreignId('user_id')->nullable()->change();
            
            // Agregar campos para checkout de invitados
            $table->boolean('is_guest')->default(false)->after('user_id');
            $table->string('guest_token', 64)->unique()->nullable()->after('is_guest');
            
            // Índice para búsqueda por token
            $table->index('guest_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['is_guest', 'guest_token']);
            $table->foreignId('user_id')->nullable(false)->change();
        });
    }
};
