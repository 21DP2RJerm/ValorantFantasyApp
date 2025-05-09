<?php

namespace App\Http\Controllers;

use App\Models\FantasyTeam;
use App\Models\FantasyTeamPlayers;
use App\Models\Players;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FantasyTeamController extends Controller
{
    public function createFantasyTeam(Request $request)
    {
    $user = Auth::user();

    $request->validate([
        'tournament_id' => 'required|integer',
        'players' => 'required|array|size:5', 
    ]);
    
    if(FantasyTeam::where('tournament_id', $request->tournament_id)
        ->where('user_id', $user->id)
        ->exists())
    {
        return response()->json("Fantasy team for this tournament already exists");
    }
    $fantasyTeam = new FantasyTeam();
    $fantasyTeam->user_id = $user->id;
    $fantasyTeam->tournament_id = $request->tournament_id;
    $fantasyTeam->points = 0;
    $fantasyTeam->save();

    foreach ($request->players as $playerId) {
        $fantasyTeamPlayer = new FantasyTeamPlayers();
        $fantasyTeamPlayer->fantasy_team_id = $fantasyTeam->id;
        $fantasyTeamPlayer->player_id = $playerId;
        $fantasyTeamPlayer->save();
    }

    return response()->json("Fantasy team created");
    }

    public function getUserFantasyTeams()
    {
        $user = Auth::user();

        $fantasyTeams = FantasyTeam::where('user_id', $user->id)->get();

        if ($fantasyTeams->isEmpty()) {
            return response()->json("No teams");
        }

        $fantasyTeams = $fantasyTeams->map(function ($fantasyTeam) {
            $FantasyPlayers = FantasyTeamPlayers::where('fantasy_team_id', $fantasyTeam->id)->get();

            $FantasyPlayers = $FantasyPlayers->map(function ($FantasyPlayer) {
                $player = Players::find($FantasyPlayer->player_id);

                if (!$player) return null;

                return [
                    'player_id' => $player->id,
                    'in_game_name' => $player->in_game_name,
                    'logo' => asset("storage/players/{$player->logo}"),
                    'team_logo' => asset("storage/teams/{$player->team->logo}") 
                ];
            })->filter(); 

            return [
                'fantasy_team_id' => $fantasyTeam->id,
                'tournament_id' => $fantasyTeam->tournament_id,
                'players' => $FantasyPlayers,
            ];
        });

        return response()->json($fantasyTeams);
    }
}
