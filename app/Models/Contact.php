<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'email',
        'sujet',
        'message',
        'consent',
        'ip',
        'is_handled',
    ];

    protected function casts(): array
    {
        return [
            'consent' => 'boolean',
            'is_handled' => 'boolean',
        ];
    }
}