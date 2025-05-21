<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TournamentTeam extends Model
{
    protected $table = 'tournament_teams'; // make sure this matches your table
    protected $fillable = ['team_id', 'tournament_id'];
    public function team()
    {
        return $this->belongsTo(Teams::class);
    }

    public function tournament()
    {
        return $this->belongsTo(Tournaments::class);
    }
}
