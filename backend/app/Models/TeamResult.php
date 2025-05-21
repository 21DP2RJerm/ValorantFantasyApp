<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamResult extends Model
{
    public function gameResult(){
        $this->belongsTo(GameResults::class);
    }
    public function team(){
        $this->belongsTo(Teams::class);
    }
}
