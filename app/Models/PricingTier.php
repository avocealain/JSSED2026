<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingTier extends Model
{
    use HasFactory;

    protected $fillable = ['categorie', 'prix_early', 'prix_late', 'avantages', 'ordre'];

    protected $casts = [
        'avantages' => 'array',
    ];
}