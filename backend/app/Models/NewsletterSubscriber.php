<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsletterSubscriber extends Model
{
    protected $fillable = [
        'email',
        'name',
        'status',
        'token',
        'subscribed_at',
        'unsubscribed_at',
    ];

    protected $casts = [
        'subscribed_at' => 'datetime',
        'unsubscribed_at' => 'datetime',
    ];

    /**
     * Boot method to generate token
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($subscriber) {
            if (!$subscriber->token) {
                $subscriber->token = Str::random(64);
            }
            if (!$subscriber->subscribed_at && $subscriber->status === 'subscribed') {
                $subscriber->subscribed_at = now();
            }
        });
    }

    /**
     * Subscribe
     */
    public function subscribe()
    {
        $this->status = 'subscribed';
        $this->subscribed_at = now();
        $this->unsubscribed_at = null;
        $this->save();
    }

    /**
     * Unsubscribe
     */
    public function unsubscribe()
    {
        $this->status = 'unsubscribed';
        $this->unsubscribed_at = now();
        $this->save();
    }

    /**
     * Scope active subscribers
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'subscribed');
    }
}
