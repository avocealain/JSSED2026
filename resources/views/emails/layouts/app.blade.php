<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Vos styles CSS communs ici */
        body { font-family: sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
        .header { text-align: center; margin-bottom: 20px; }
        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #888; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            {{-- Remplacez par votre logo --}}
            <img src="{{ $message->embed(public_path('/logo.png')) }}" alt="Logo JSSED" style="max-width: 150px;">
            <h1>JSSED 2026</h1>
        </div>

        {{-- Le contenu spécifique de chaque email sera injecté ici --}}
        {{ $slot }}

        <div class="footer">
            <p>&copy; {{ date('Y') }} JSSED. Tous droits réservés.</p>
            <p>Ceci est un e-mail automatique, merci de ne pas y répondre.</p>
        </div>
    </div>
</body>
</html>
