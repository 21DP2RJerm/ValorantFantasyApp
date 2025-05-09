<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TournamentTeam extends Model
{
    public function team()
    {
        return $this->belongsTo(Teams::class);
    }

    public function tournament()
    {
        return $this->belongsTo(Tournaments::class);
    }
}
