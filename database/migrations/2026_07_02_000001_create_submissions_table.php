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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->string('ref_code')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('atelier_id')->nullable(); // Comme demandé, nullable.
            $table->string('format'); // 'oral' ou 'poster'
            $table->string('langue')->default('fr'); // 'fr' ou 'en'
            $table->string('titre');
            $table->text('resume');
            $table->string('keywords');
            $table->string('financement')->nullable();
            $table->json('coauthors')->nullable();
            $table->string('status')->default('pending');
            $table->boolean('consent')->default(false);
            $table->string('consent_ip')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
