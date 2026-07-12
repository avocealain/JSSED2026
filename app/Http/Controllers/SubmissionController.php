<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Http\Requests\StoreSubmissionRequest;
use App\Mail\NewSubmissionAdminNotification;
use App\Services\AdminNotificationService;
use App\Traits\GeneratesReferenceCode;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class SubmissionController extends Controller
{
    use GeneratesReferenceCode;

    // Affiche le formulaire
    public function create(): Response
    {
        return Inertia::render('Candidate/SubmissionForm', [
            'ateliers' => $this->getAteliers(),
        ]);
    }

    // Enregistre la soumission
    public function store(StoreSubmissionRequest $request): RedirectResponse
    {
        // Génération de la référence
        $ref_code = $this->generateRefCode(Submission::class, 'JSSED2026-', 'ref_code', 6);

        // Création en base
        $submission = $request->user()->submissions()->create(
            array_merge(
                $request->validated(),
                [
                    'ref_code' => $ref_code,
                    'consent_ip' => $request->ip(),
                ]
            )
        );

        try {
            AdminNotificationService::notifyAdmins(NewSubmissionAdminNotification::class, $submission);
        } catch (Exception $e) {
            Log::error('Erreur Mail Admin: ' . $e->getMessage());
        }

        // Redirection
        return to_route('dashboard')->with(
            'success',
            'Soumission enregistrée. Référence : ' . $submission->ref_code
        );
    }

    // Affiche l'édition
    public function edit(Submission $submission): Response
    {
        $this->authorize('update', $submission);

        return Inertia::render('Candidate/SubmissionForm', [
            'ateliers' => $this->getAteliers(),
            'submission' => $submission,
        ]);
    }

    // Met à jour la soumission
    public function update(StoreSubmissionRequest $request, Submission $submission): RedirectResponse
    {
        $this->authorize('update', $submission);

        $submission->update($request->validated());

        return to_route('dashboard')->with('success', 'Soumission mise à jour.');
    }

    // Liste des ateliers
    private function getAteliers(): array
    {
        return [
            ['id' => 1, 'titre' => 'Dynamiques démographiques et socio-environnementales'],
            ['id' => 2, 'titre' => 'Données, méthodes statistiques et applications'],
            ['id' => 3, 'titre' => 'Évaluation des politiques publiques et des projets de développement'],
        ];
    }
}
