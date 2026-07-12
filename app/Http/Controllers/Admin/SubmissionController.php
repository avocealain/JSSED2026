<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSubmissionStatusRequest;
use App\Mail\SubmissionStatusUpdated;
use App\Models\Submission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class SubmissionController extends Controller
{
    /**
     * Affiche la liste de toutes les soumissions pour l'administration.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Submission::class);

        $submissions = Submission::with('user:id,prenom,nom')
            ->when($request->input('status'), function ($query, $status) {
                return $query->where('status', $status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Submissions/Index', [
            'submissions' => $submissions,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Affiche les détails d'une soumission spécifique.
     */
    public function show(Submission $submission): Response
    {
        $this->authorize('view', $submission);

        // Charger l'auteur et l'atelier pour un affichage complet
        $submission->load(['user', 'atelier']);

        return Inertia::render('Admin/Submissions/Show', [
            'submission' => $submission,
        ]);
    }

    /**
     * Met à jour le statut d'une soumission.
     */
    public function updateStatus(UpdateSubmissionStatusRequest $request, Submission $submission): RedirectResponse
    {
        $this->authorize('updateStatus', $submission);

        $validated = $request->validated();

        $oldStatus = $submission->status;
        $submission->status = $validated['status'];
        $submission->save();

        // Envoi de l'e-mail de notification à l'utilisateur si le statut a réellement changé.
        if ($oldStatus !== $submission->status) {
            // L'e-mail est ajouté à la file d'attente pour être traité en arrière-plan.
            Mail::to($submission->user)->queue(new SubmissionStatusUpdated($submission));
        }

        return back()->with('success', 'Le statut de la soumission a été mis à jour avec succès.');
    }
}