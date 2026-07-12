<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Vérifie si l'utilisateur est authentifié et si son rôle est 'admin'
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            // Si non, renvoie une erreur 403 (Accès Interdit)
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
