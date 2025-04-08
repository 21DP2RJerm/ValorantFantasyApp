<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Players extends Model
{
    public function fantasyTeamPlayers()
    {
        return $this->hasMany(FantasyTeamPlayers::class);
    }

    public function fantasyTeams()
    {
        return $this->belongsToMany(FantasyTeam::class, 'fantasy_team_players');
    }
    public function team()
    {
        return $this->belongsTo(Teams::class);
    }
}
