<?php

namespace App\Mail;

use App\Models\NewsletterSubscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Newsletter extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $subscriber;
    public $subject;
    public $content;
    public $data;

    /**
     * Create a new message instance.
     */
    public function __construct(NewsletterSubscriber $subscriber, $subject, $content, $data = [])
    {
        $this->subscriber = $subscriber;
        $this->subject = $subject;
        $this->content = $content;
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.newsletter.template',
            with: [
                'subscriber' => $this->subscriber,
                'emailContent' => $this->content,
                'data' => $this->data,
                'unsubscribeUrl' => url('/newsletter/unsubscribe/' . $this->subscriber->token),
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
