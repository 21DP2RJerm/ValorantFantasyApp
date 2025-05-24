<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tournaments extends Model
{
    public function fantasyTeams()
    {
        return $this->hasMany(FantasyTeam::class);
    }

    public function tournamentTeams()
    {
        return $this->hasMany(TournamentTeam::class);
    }

    public function games()
    {
        return $this->hasMany(GameResults::class, 'tournament_id');
    }

}
