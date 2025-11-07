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
        // Tabla de tags
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // nombre del tag (ej: "deportivo", "casual", "verano")
            $table->string('slug')->unique(); // slug para URLs
            $table->text('description')->nullable(); // descripción opcional
            $table->timestamps();
        });

        // Tabla pivote producto-tags (muchos a muchos)
        Schema::create('product_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('tag_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Índice único para evitar duplicados
            $table->unique(['product_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_tag');
        Schema::dropIfExists('tags');
    }
};
