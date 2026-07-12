<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Review;
use App\Models\Transaction;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Obtient les évaluations associées à cet utilisateur.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'reviewer_id');
    }
    /**
     * Obtient les transactions associées à cet utilisateur.
     */
    public function verifiedTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'verified_by');
    }


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'prenom',
        'nom',
        'email',
        'password',
        'institution',
        'pays',
        'tel',
        'role',
        'type',
        'password_status',
    ];


    /**
     * Définit un accesseur pour l'attribut 'name'.
     * Il construit dynamiquement le nom complet à partir du prénom et du nom.
     * Cela garantit que le nom complet est toujours synchronisé.
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->prenom . ' ' . $this->nom,
        );
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }


}
