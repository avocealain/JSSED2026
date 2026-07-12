<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware pour forcer les utilisateurs avec un mot de passe temporaire
 * à le changer avant de pouvoir naviguer sur le site.
 */
class ForcePasswordChange
{
    /**
     * Gère une requête entrante.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Vérifie si l'utilisateur est connecté et si son statut de mot de passe est 'temporary'
        if (Auth::check() && Auth::user()->password_status === 'temporary') {

            // Autorise l'accès aux routes de changement de mot de passe et de déconnexion
            if (! $request->routeIs('password.force.edit') && ! $request->routeIs('password.force.update') && ! $request->routeIs('logout')) {

                // Redirige vers la page de changement de mot de passe pour toutes les autres routes
                return redirect()->route('password.force.edit')->with('warning', 'Pour des raisons de sécurité, vous devez changer votre mot de passe temporaire.');
            }
        }

        return $next($request);
    }
}
