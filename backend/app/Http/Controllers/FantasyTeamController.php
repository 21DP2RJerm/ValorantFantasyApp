<?php

namespace App\Http\Controllers;

use App\Models\FantasyTeam;
use App\Models\FantasyTeamPlayers;
use App\Models\Players;
use App\Models\Tournaments;
use App\Models\User;
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
        $teamCounts = [];

        foreach ($request->players as $playerId) {
            $player = Players::find($playerId);

            $teamId = $player->team_id;

            if (!isset($teamCounts[$teamId])) {
                $teamCounts[$teamId] = 0;
            }

            $teamCounts[$teamId]++;

            if ($teamCounts[$teamId] > 2) {
                return response()->json("You cannot select more than 2 players from the same team");
            }
        }
        $fantasyTeam = new FantasyTeam();
        $fantasyTeam->user_id = $user->id;
        $fantasyTeam->tournament_id = $request->tournament_id;
        $fantasyTeam->points = 0;
        $fantasyTeam->save();

        $i = 0;
        foreach ($request->players as $playerId) {
            $fantasyTeamPlayer = new FantasyTeamPlayers();
            $fantasyTeamPlayer->fantasy_team_id = $fantasyTeam->id;
            $fantasyTeamPlayer->player_id = $playerId;
            $fantasyTeamPlayer->save();
            $i = $i + 1;
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
            // Step 1: Get all fantasy teams in this tournament
            $tournamentTeams = FantasyTeam::where('tournament_id', $fantasyTeam->tournament_id)
                ->orderByDesc('points')
                ->get();

            // Step 2: Determine this team's rank
            $place = $tournamentTeams->search(function ($team) use ($fantasyTeam) {
                return $team->id === $fantasyTeam->id;
            }) + 1; // Add 1 for 1-based index

            // Step 3: Load tournament and players
            $tournament = Tournaments::find($fantasyTeam->tournament_id);
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
                'points' => $fantasyTeam->points,
                'tournament_name' => $tournament->name,
                'place' => $place,
                'players' => $FantasyPlayers,
            ];
        });

        return response()->json($fantasyTeams);
    }

    public function getFantasyTeams($tournamentId)
    {
        $fantasyTeams = FantasyTeam::with(['user', 'fantasyTeamPlayers.player'])
            ->where('tournament_id', $tournamentId)
            ->orderBy('points', 'desc')
            ->get();
    
        return response()->json([
            'fantasyTeams' => $fantasyTeams
        ]);
    }
}
