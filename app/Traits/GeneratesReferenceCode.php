<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait GeneratesReferenceCode
{
    /**
     * Génère un code de référence unique pour un modèle donné.
     *
     * Boucle jusqu'à obtenir une valeur absente de la colonne cible en base,
     * garantissant l'unicité sans dépendre uniquement d'une contrainte SQL.
     *
     * @param  class-string<Model>  $modelClass  Modèle Eloquent à interroger (ex: Registration::class)
     * @param  string  $prefix  Préfixe collé devant la partie aléatoire (ex: 'JSSED-')
     * @param  string  $column  Colonne d'unicité à vérifier (défaut: 'ref_code')
     * @param  int     $length  Longueur de la partie aléatoire (défaut: 8)
     */
    public function generateRefCode(string $modelClass, string $prefix, string $column = 'ref_code', int $length = 8): string
    {
        do {
            $code = $prefix . strtoupper(Str::random($length));
        } while ($modelClass::where($column, $code)->exists());

        return $code;
    }
}
