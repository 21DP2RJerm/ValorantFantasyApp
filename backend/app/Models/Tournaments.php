<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tournaments extends Model
{
    public function fantasyTeams()
    {
        return $this->hasMany(FantasyTeam::class);
    }

}
