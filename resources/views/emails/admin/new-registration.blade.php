{{-- Fichier : resources/views/emails/admin/new_registration.blade.php --}}
<x-mail::message>
# Nouvelle inscription en attente

Une nouvelle demande d'inscription a été enregistrée et est en attente de validation de paiement.

**Informations du participant :**
- **Nom complet :** {{ $registration->prenom }} {{ $registration->nom }}
- **Email :** {{ $registration->email }}
- **Type d'inscription :** {{ ucfirst($registration->type) }}
- **Référence :** `{{ $registration->ref_code }}`

Le participant a été notifié et doit envoyer sa preuve de paiement (eQuittance).

<x-mail::button :url="route('admin.dashboard')">
Voir le tableau de bord
</x-mail::button>

Cordialement,<br>
Le système de notification JSSED
</x-mail::message>
