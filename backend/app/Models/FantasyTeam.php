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

    public function calculatePoints($tournamentId, $gameResultIds)
    {
        $totalPoints = 0;
    
        foreach ($this->fantasyTeamPlayers as $player) {
            $sum = PlayerResults::whereIn('game_result_id', $gameResultIds)
                ->where('player_id', $player->player_id)
                ->sum('points');
    
            \Log::info("Player {$player->player_id} points: {$sum}");
    
            $totalPoints += $sum;
        }
    
        $this->points = $totalPoints;
        $this->save();
    
        return $totalPoints;
    }
    
}
