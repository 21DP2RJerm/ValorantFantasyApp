<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameResults extends Model
{
    public $casts =[
        'maps' => 'array',
    ];
    public function tournament()
    {
        return $this->belongsTo(Tournaments::class);
    }
    public function playerResults()
    {
        return $this->hasMany(PlayerResults::class);
    }
}
