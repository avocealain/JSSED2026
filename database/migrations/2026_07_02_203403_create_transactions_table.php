<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->cascadeOnDelete();
            $table->integer('montant'); // Stocké en centimes pour éviter les problèmes de floating point
            $table->string('reference_equittance')->nullable();
            $table->string('receipt_file_path')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->cascadeOnDelete();
            $table->string('status')->default('pending'); // ex: 'pending', 'completed', 'failed'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
