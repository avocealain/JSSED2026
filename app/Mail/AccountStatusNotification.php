<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AccountStatusNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public string $status;
    public string $userName;
    public ?string $temporaryPassword;
    public string $email;

    /**
     * @param string $status 'approved' ou 'rejected'
     * @param string $userName Nom de l'utilisateur
     * @param string $email Email de l'utilisateur
     * @param string|null $temporaryPassword Mot de passe si approuvé
     */
    public function __construct(string $status, string $userName, string $email, ?string $temporaryPassword = null)
    {
        $this->status = $status;
        $this->userName = $userName;
        $this->temporaryPassword = $temporaryPassword;
        $this->email = $email;
    }

    public function envelope(): Envelope
    {
        $subject = $this->status === 'approved'
            ? 'Votre inscription a été approuvée !'
            : 'Mise à jour concernant votre inscription';

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        // affichage d'un contenu différent selon le statut
        return new Content(markdown: 'emails.auth.account-status');
    }
}
