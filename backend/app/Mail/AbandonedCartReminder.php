<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AbandonedCartReminder extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $user;
    public $cartItems;
    public $cartTotal;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user, $cartItems, $cartTotal)
    {
        $this->user = $user;
        $this->cartItems = $cartItems;
        $this->cartTotal = $cartTotal;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '¡No olvides tu carrito! 🛒',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.cart.abandoned',
            with: [
                'user' => $this->user,
                'cartItems' => $this->cartItems,
                'cartTotal' => $this->cartTotal,
                'cartUrl' => url('/cart'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
