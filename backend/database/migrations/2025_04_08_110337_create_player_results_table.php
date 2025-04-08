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
        Schema::create('player_results', function (Blueprint $table) {
            $table->id();
            $table->integer('game_result_id');
            $table->integer('player_id');
            $table->integer('kills');
            $table->integer('deaths');
            $table->integer('assists');
            $table->integer('points');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_results');
    }
};
