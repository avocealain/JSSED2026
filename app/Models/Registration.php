<?php

// Fichier : app/Models/Registration.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ref_code',
        'prenom',
        'nom',
        'email',
        'tel',
        'institution',
        'pays',
        'type',
        'status',
        'consent',
        'consent_ip',
    ];

    /**
     * Récupère l'utilisateur associé à cette inscription (une fois approuvée).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}