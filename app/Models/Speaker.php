<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Speaker extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'titre_academique',
        'affiliation',
        'pays',
        'bio',
        'photo_path',
        'type',
        'ordre',
    ];

    public function programSessions(): HasMany
    {
        return $this->hasMany(ProgramSession::class);
    }
}