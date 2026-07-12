<x-mail::message>
# Mise à jour du statut de votre soumission

Bonjour {{ $submission->user->prenom }},

Le statut de votre soumission pour les JSSED 2026 a été mis à jour.

**Titre :** {{ $submission->titre }}
<br>
**Nouveau statut :**
@if($submission->status === 'approved')
<span style="color: green; font-weight: bold;">Approuvée</span>
@elseif($submission->status === 'rejected')
<span style="color: red; font-weight: bold;">Rejetée</span>
@else
<span style="font-weight: bold;">En attente</span>
@endif

Vous pouvez consulter les détails de vos soumissions en vous connectant à votre espace personnel.

@component('mail::button', ['url' => route('dashboard')])
Accéder à mon tableau de bord
@endcomponent

Cordialement,<br>
Le Comité d'Organisation
</x-mail::message>

