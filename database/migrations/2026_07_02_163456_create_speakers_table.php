<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('speakers', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('titre_academique')->nullable();
            $table->string('affiliation')->nullable();
            $table->string('pays')->nullable();
            $table->text('bio')->nullable();
            $table->string('photo_path')->nullable();
            $table->string('type'); // ex: 'keynote', 'invite'
            $table->integer('ordre');
            $table->timestamps();
        });
    }
};