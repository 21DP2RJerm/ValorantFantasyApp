<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FantasyTeam extends Model
{
    public function tournament()
    {
        return $this->belongsTo(Tournaments::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function fantasyTeamPlayers()
    {
        return $this->hasMany(FantasyTeamPlayers::class);
    }
    public function players()
    {
        return $this->belongsToMany(Players::class, 'fantasy_team_players');
    }
}
