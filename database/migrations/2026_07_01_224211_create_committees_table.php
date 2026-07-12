<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('committees', function (Blueprint $table) {
            $table->id();
            $table->string('type_comite'); // ex: 'scientifique', 'direction'
            $table->string('nom_complet');
            $table->string('role_specific')->nullable();
            $table->integer('ordre');
            $table->timestamps();
        });
    }
};