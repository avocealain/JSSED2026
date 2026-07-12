<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('ref_code')->unique();
            $table->string('type'); // ex: 'etudiant', 'chercheur', 'exposant'
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('tel')->nullable();
            $table->string('institution')->nullable();
            $table->string('pays');
            $table->boolean('consent')->default(false);
            $table->string('consent_ip')->nullable();
            $table->string('status')->default('pending_approval');
            $table->string('payment_status')->default('unpaid');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};