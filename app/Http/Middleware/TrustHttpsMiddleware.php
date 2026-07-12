<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware pour gérer correctement la terminaison HTTPS derrière un proxy (ex: Render).
 */
class TrustHttpsMiddleware
{
    /**
     * Gère une requête entrante.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Render (et la plupart des proxys) positionne l'en-tête 'x-forwarded-proto'.
        // Si sa valeur est 'https', nous savons que la connexion originale était sécurisée.
        if (env('APP_ENV') === 'production' && $request->header('x-forwarded-proto') === 'https') {
            // On indique à Laravel que la requête est sécurisée.
            $request->server->set('HTTPS', 'on');
            // On force le générateur d'URLs à utiliser le schéma 'https' partout.
            URL::forceScheme('https');
        }

        return $next($request);
    }
}
