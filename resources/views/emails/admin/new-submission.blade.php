<x-mail::message>
# Nouvelle soumission de communication

Une nouvelle communication a été soumise par un participant.

## Détails de la soumission

- **Auteur :** {{ $submission->user->prenom }} {{ $submission->user->nom }}
- **Titre :** {{ $submission->titre }}
- **Code de référence :** {{ $submission->ref_code }}
- **Date de soumission :** {{ $submission->created_at->format('d/m/Y à H:i') }}

Vous pouvez consulter et évaluer cette soumission depuis le tableau de bord d'administration des soumissions.

@component('mail::button', ['url' => route('admin.submissions.show', $submission->id)])
Voir la soumission
@endcomponent

Cordialement,<br>
Le comité d'organisation des JSSED 2026

</x-mail::message>