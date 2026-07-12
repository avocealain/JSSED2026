<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AccountStatusNotification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
//use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Registration;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Affiche le tableau de bord principal de l'administration.
     */
    public function index(Request $request): Response
    {
        // On récupère les inscriptions qui sont en attente de validation.
        // Une inscription est "en attente" si son statut est 'pending_approval'.
        $pendingRegistrations = Registration::where('status', 'pending_approval')->latest()->get();

        // On récupère les utilisateurs approuvés (rôle 'participant') avec filtres.
        // On joint avec la table registrations pour pouvoir filtrer par type de participant.
        $query = User::query()
            ->join('registrations', 'users.id', '=', 'registrations.user_id')
            ->where('role', 'participant') // On ne montre que les participants, pas les admins.
            ->orderBy('users.created_at', 'desc');

        // Filtre de recherche "intelligent"
        $query->when($request->input('search'), function ($q, $search) {
            $q->where(function ($q) use ($search) {
                $q->where('users.prenom', 'like', "%{$search}%") // La recherche se fait sur `prenom` qui contient le nom complet.
                    ->orWhere('users.email', 'like', "%{$search}%")
                    ->orWhere('users.institution', 'like', "%{$search}%");
            });
        });

        // Filtre par type/catégorie
        $query->when($request->input('type'), function ($q, $type) {
            $q->where('registrations.type', $type);
        });

        // Paginer les résultats pour la liste des utilisateurs approuvés.
        // Le nom 'approved_page' évite les conflits si une autre pagination existe sur la page.
        // On sélectionne les colonnes de `users` et le `type` de `registrations`.
        $approvedUsers = $query
            ->select('users.*', 'registrations.type')
            ->paginate(15, ['*'], 'approved_page')
            ->withQueryString();

        return Inertia::render('Admin/Dashboard', [
            'pendingRegistrations' => $pendingRegistrations,
            'approvedUsers' => $approvedUsers,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    /**
     * Approuve une inscription en attente.
     */
    public function approve(Registration $registration): RedirectResponse
    {
        if ($registration->status !== 'pending_approval') {
            return back()->with('info', "Cette inscription a déjà été traitée.");
        }

        // Vérifie si un utilisateur avec cet email existe déjà.
        if (User::where('email', $registration->email)->exists()) {
            return back()->with('error', "Un compte utilisateur avec l'email {$registration->email} existe déjà.");
        }

        $user = null;
        $temporaryPassword = Str::random(10);

        // Utilisation d'une transaction pour garantir que la création de l'utilisateur
        // et la mise à jour de l'inscription sont atomiques.
        DB::transaction(function () use ($registration, $temporaryPassword, &$user) {
            $user = User::create([
                // La base de données requiert les champs `prenom` et `nom`.
                'prenom' => $registration->prenom,
                'nom' => $registration->nom,
                'email' => $registration->email,
                'password' => Hash::make($temporaryPassword),
                'institution' => $registration->institution,
                'pays' => $registration->pays,
                'tel' => $registration->tel,
                'password_status' => 'temporary',
                'email_verified_at' => now(), // Le compte est considéré comme vérifié car approuvé par un admin.
            ]);

            $registration->status = 'approved';
            $registration->user_id = $user->id;
            $registration->save();
        });

        // L'email est mis en file d'attente pour ne pas ralentir la réponse HTTP.
        Mail::to($user)->queue(new AccountStatusNotification(
            'approved',
            $user->prenom . ' ' . $user->nom,
            $user->email,
            $temporaryPassword
        ));

        // Message de succès avec le nom complet.
        return back()->with('success', "L'inscription de {$user->prenom} {$user->nom} a été approuvée avec succès.");
    }

    /**
     * Rejette et supprime une inscription en attente.
     */
    public function reject(Registration $registration): RedirectResponse
    {
        if ($registration->status !== 'pending_approval') {
            return back()->with('info', "Cette inscription a déjà été traitée.");
        }

        $userName = $registration->prenom . ' ' . $registration->nom;
        $userEmail = $registration->email;

        $registration->status = 'rejected';
        $registration->save();

        // Envoyer un e-mail de rejet
        Mail::to($userEmail)->queue(new AccountStatusNotification('rejected', $userName, $userEmail));
        
        return back()->with('success', "L'inscription de \"{$userName}\" a été rejetée.");
    }
}