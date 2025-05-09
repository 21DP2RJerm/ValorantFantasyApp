<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teams extends Model
{
    public function players()
    {
        return $this->hasMany(Players::class);
    }
    public function tournamentTeams()
    {
        return $this->hasMany(TournamentTeam::class);
    }
}
