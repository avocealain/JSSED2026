<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_tiers', function (Blueprint $table) {
            $table->id();
            $table->string('categorie');
            $table->integer('prix_early');
            $table->integer('prix_late');
            $table->json('avantages');
            $table->integer('ordre');
            $table->timestamps();
        });
    }
};