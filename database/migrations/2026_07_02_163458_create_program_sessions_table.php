<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_sessions', function (Blueprint $table) {
            $table->id();
            $table->date('jour');
            $table->string('heure_debut');
            $table->string('heure_fin');
            $table->string('titre');
            $table->string('type'); // ex: 'pleniere', 'atelier'
            $table->string('salle')->nullable();
            $table->foreignId('atelier_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('speaker_id')->nullable()->constrained()->nullOnDelete();
            $table->text('description')->nullable();
            $table->integer('ordre');
            $table->timestamps();
        });
    }
};