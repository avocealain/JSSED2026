<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ForcePasswordChangeController extends Controller
{
    /**
     * Affiche le formulaire pour forcer le changement de mot de passe.
     */
    public function edit(): Response
    {
        return Inertia::render('Auth/ForceChangePassword');
    }

    /**
     * Met à jour le mot de passe temporaire de l'utilisateur.
     */
    public function update(Request $request): RedirectResponse
    {
        // a) Valider le nouveau mot de passe
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        // b) Mettre à jour le mot de passe et le statut
        $request->user()->update([
            'password' => Hash::make($validated['password']),
            'password_status' => 'changed',
        ]);

        // c) Rediriger vers le tableau de bord avec un message de succès
        return to_route('dashboard')->with('success', 'Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant naviguer sur le site.');
    }
}