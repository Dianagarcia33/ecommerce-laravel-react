<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'is_guest',
        'guest_token',
        'total',
        'status',
        'customer_name',
        'customer_email',
        'customer_phone',
        'shipping_address',
        'notes'
    ];

    protected $casts = [
        'total' => 'decimal:2',
        'is_guest' => 'boolean'
    ];

    protected $hidden = [
        'guest_token'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Generar token único para invitados
     */
    public static function generateGuestToken()
    {
        do {
            $token = bin2hex(random_bytes(32));
        } while (self::where('guest_token', $token)->exists());
        
        return $token;
    }

    /**
     * Verificar si es orden de invitado
     */
    public function isGuest()
    {
        return $this->is_guest === true;
    }
}
