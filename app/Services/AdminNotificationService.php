<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;

class AdminNotificationService
{
    /**
     * Met en file d'attente un e-mail distinct pour chaque administrateur.
     *
     * On passe la CLASSE du Mailable (et ses arguments de constructeur), et non
     * une instance déjà construite : une nouvelle instance est créée à chaque
     * itération. Cela évite que les destinataires ne s'accumulent sur un objet
     * Mailable partagé (qui provoquerait un envoi groupé involontaire) et
     * reproduit fidèlement le comportement d'origine des contrôleurs
     * (un message individuel par administrateur).
     *
     * @param  class-string<Mailable>  $mailableClass
     * @param  mixed  ...$args  Arguments transmis au constructeur du Mailable
     */
    public static function notifyAdmins(string $mailableClass, ...$args): void
    {
        $admins = User::where('role', 'admin')->get();

        foreach ($admins as $admin) {
            Mail::to($admin)->queue(new $mailableClass(...$args));
        }
    }
}
