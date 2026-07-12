<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Review;
use App\Models\Transaction;


class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'ref_code',
        'user_id',
        'atelier_id',
        'format',
        'langue',
        'titre',
        'resume',
        'keywords',
        'financement',
        'coauthors',
        'status',
        'consent',
        'consent_ip',
    ];

    /**
     * Obtient les évaluations associées à cette soumission.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
    /**
     * Obtient les transactions associées à cette soumission.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Obtient les fichiers associés à cette soumission.
     */
    public function submissionfile(): HasMany
    {
        return $this->hasMany(SubmissionFile::class);
    }
    protected function casts(): array
    {
        return [
            'coauthors' => 'array',
            'consent' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function atelier(): BelongsTo
    {
        return $this->belongsTo(Atelier::class);
    }
}
