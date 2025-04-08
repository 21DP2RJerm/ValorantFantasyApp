<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayerResults extends Model
{
    public function gameresult()
    {
        return $this->belongsTo(GameResults::class, 'game_result_id');
    }
    public function player()
    {
        return $this->belongsTo(User::class, 'player_id');
    }
}
