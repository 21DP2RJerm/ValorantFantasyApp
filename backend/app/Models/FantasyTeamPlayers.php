<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FantasyTeamPlayers extends Model
{
    public function fantasyTeam()
    {
        return $this->belongsTo(FantasyTeam::class);
    }
    public function results()
    {
        return $this->hasMany(PlayerResults::class);
    }
    public function player()
    {
        return $this->belongsTo(Players::class);
    }
    
}
