<x-mail::message>
# Bonjour {{ $userName }},

@if ($status === 'approved')
Félicitations ! Votre inscription aux **JSSED 2026** a été approuvée.

Vous pouvez maintenant vous connecter à votre espace personnel avec les identifiants suivants :
- **Email :** {{ $email }}
- **Mot de passe temporaire :** `{{ $temporaryPassword }}`

Pour des raisons de sécurité, il vous sera demandé de changer ce mot de passe lors de votre première connexion.

<x-mail::button :url="route('login')">
Accéder à mon espace
</x-mail::button>

@else
Nous vous remercions de l'intérêt que vous portez aux **JSSED 2026**.

Après examen de votre demande, nous sommes au regret de vous informer que votre pré-inscription n'a pas pu être validée pour le moment.

Pour toute question, n'hésitez pas à nous contacter.
@endif

Cordialement,<br>
Le comité d'organisation des JSSED 2026

</x-mail::message>
