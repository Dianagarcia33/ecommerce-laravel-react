<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'rating',
        'title',
        'comment',
        'images', // Agregar images
        'verified_purchase',
        'is_approved'
    ];

    protected $casts = [
        'verified_purchase' => 'boolean',
        'is_approved' => 'boolean',
        'rating' => 'integer',
        'images' => 'array' // Cast a array para JSON
    ];

    protected $with = ['user'];

    // Relación con producto
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Relación con usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope para reseñas aprobadas
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    // Scope para ordenar por más recientes
    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
