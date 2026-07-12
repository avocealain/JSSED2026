<?php
namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\ProgramSession;
use App\Models\Speaker;
use App\Models\TimelineEvent;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Affiche la page d'accueil avec les informations clés.
     */
    public function index(): Response
    {
        // Définition des breadcrumbs pour le SEO et la navigation
        $breadcrumbs = [
            ['label' => 'Accueil', 'url' => route('home')],
        ];

        // Récupération des données
        $faqs = Faq::where('is_active', true)->orderBy('ordre')->get();
        $timelineEvents = TimelineEvent::orderBy('date_event')->get();
        $speakers = Speaker::orderBy('ordre')->get();
        $programSessions = ProgramSession::orderBy('jour')->orderBy('heure_debut')->get()->groupBy('jour');

        // Retourne la vue Inertia avec les données
        return Inertia::render('Public/Home', [
            'faqs' => $faqs,
            'timelineEvents' => $timelineEvents,
            'speakers' => $speakers,
            'programSessions' => $programSessions,
            'breadcrumbs' => $breadcrumbs,
        ]);
    }

    /**
     * Affiche la page du programme de l'événement.
     */
    public function programme(): Response
    {
        // Définition des breadcrumbs
        $breadcrumbs = [
            ['label' => 'Accueil', 'url' => route('home')],
            ['label' => 'Programme'],
        ];

        // Récupération des intervenants, triés par ordre d'affichage
        $speakers = Speaker::orderBy('ordre')->get();

        // Récupération des sessions, groupées par jour (clé 'Y-m-d') pour un affichage clair
        $programSessions = ProgramSession::orderBy('jour')->orderBy('heure_debut')->get()->groupBy(function ($session) {
            return $session->jour->format('Y-m-d'); // Groupement par date
        });

        // Retourne la vue Inertia. Noms de props alignés sur index() et sur la page Programme.jsx.
        return Inertia::render('Public/Programme', [
            'speakers' => $speakers,
            'programSessions' => $programSessions,
            'breadcrumbs' => $breadcrumbs,
        ]);
    }
}
