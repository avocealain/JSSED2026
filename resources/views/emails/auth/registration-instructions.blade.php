<x-mail::message>
# Presque terminé, {{ $registration->prenom }} !

Merci pour votre pré-inscription aux **Journées Scientifiques de la Statistique, de l'Évaluation & de la Démographie (JSSED 2026)**.

Pour valider définitivement votre participation, il ne vous reste plus qu'à régler les frais d'inscription correspondant à votre statut : **{{ ucfirst($registration->type) }}**.

## Procédure de Paiement

Le paiement s'effectue via la plateforme e-Services du Trésor Public du Bénin.

1.  **Rendez-vous sur la plateforme :** [tresorbenin.bj](https://tresorbenin.bj/) (cherchez la section eQuittance).
2.  **Effectuez le paiement** en utilisant les informations suivantes :
    - Numéro de compte : **000001048692**
    - Clé RIB : **20**
    - Intitulé : **ENSPD — JSSED**
3.  **Envoyez le reçu :** Une fois le paiement effectué, envoyez une copie de votre reçu (eQuittance) par email à l'adresse suivante : <a href="mailto:jssed.enspd.up.2026@gmail.com">jssed.enspd.up.2026@gmail.com</a>.
    - **Important :** Veuillez préciser dans l'objet de votre email : `Paiement JSSED - {{ $registration->nom }} {{ $registration->prenom }}`.

Dès réception et vérification de votre paiement, le comité d'organisation validera votre compte. Vous recevrez alors un second email avec un mot de passe temporaire pour vous connecter à votre espace personnel.

Nous avons hâte de vous accueillir à Parakou.

Cordialement,<br>
Le Comité d'Organisation des JSSED 2026
</x-mail::message>