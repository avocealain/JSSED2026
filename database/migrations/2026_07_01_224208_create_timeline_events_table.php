<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('timeline_events', function (Blueprint $table) {
            $table->id();
            $table->date('date_event');
            $table->string('titre');
            $table->text('description')->nullable();
            $table->string('status'); // ex: 'ouvert', 'a_venir'
            $table->integer('ordre');
            $table->timestamps();
        });
    }
};