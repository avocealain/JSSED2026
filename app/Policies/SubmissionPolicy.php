<?php

namespace App\Policies;

use App\Models\Submission;
use App\Models\User;

//Ajout de la ligne \App\Models\Submission::class => \App\Policies\SubmissionPolicy::class, dans le tableau $policies

class SubmissionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Submission $submission): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Détermine si l'utilisateur peut mettre à jour la soumission.
     * L'utilisateur peut modifier la soumission s'il en est le propriétaire
     * ET si le statut de la soumission est 'pending'.
     */
    public function update(User $user, Submission $submission): bool
    {
        return $user->id === $submission->user_id && $submission->status === 'pending';
    }

    /**
     * Détermine si l'administrateur peut changer le statut d'une soumission.
     */
    public function updateStatus(User $user, Submission $submission): bool
    {
        return $user->role === 'admin';
    }
}