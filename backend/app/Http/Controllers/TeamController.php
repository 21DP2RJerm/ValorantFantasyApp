<?php

namespace App\Http\Controllers;

use App\Models\GameResults;
use Illuminate\Http\Request;
use App\Models\Teams;
use App\Models\Players;
use App\Models\TeamResult;
use App\Models\Tournaments;
use App\Models\TournamentTeam;

class TeamController extends Controller
{
    public function getRegionTeams($region)
    {
        $teams = Teams::where('region', $region)->get()->map(function ($team) {
            return [
                'name' => $team->name,
                'logo' => asset("storage/teams/{$team->logo}"),
                'id' => $team->id,
            ];
        });
    
        return response()->json($teams);
    }
    public function getTournamentTeams($tournament)
    {
        $teamIds = TournamentTeam::where('tournament_id', $tournament)->pluck('team_id');

        $teams = Teams::whereIn('id', $teamIds)->get()->map(function ($team) {
            return [
                'name' => $team->name,
                'logo' => asset("storage/teams/{$team->logo}"),
                'id' => $team->id,
            ];
        });
    
        return response()->json($teams);
    }
    public function getAllTeams()
    {
        $teams = Teams::all()->map(function ($team) {
            return [
                'name' => $team->name,
                'logo' => asset("storage/teams/{$team->logo}"),
                'id' => $team->id,
                'region' => $team->region,
            ];
        });
    
        return response()->json($teams);
    }

    public function getPlayers(Request $request)
    {
        $tournamentId = $request->query('tournament_id');
    
        if ($tournamentId) {
            $teams = TournamentTeam::where('tournament_id', $tournamentId)->pluck('team_id');

            $players = Players::whereIn('team_id', $teams)->get();
        } else {
            $players = Players::all();
        }
    
        $players = $players->map(function ($player) {
            $team = Teams::find($player->team_id);
    
            return [
                'player_id' => $player->id,
                'in_game_name' => $player->in_game_name,
                'logo' => asset("storage/players/{$player->logo}"),
                'team' => $team->id,
                'team_logo' => asset("storage/teams/{$team->logo}")
            ];
        });
    
        return response()->json($players);
    }

    public function createTeam(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'region' => 'required',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        $imageName = time() . '.' . $request->file('logo')->extension(); 
        $request->file('logo')->move(public_path('storage/teams'), $imageName);
    
        $team = new Teams();
        $team->name = $request->name;
        $team->region = $request->region;
        $team->logo = $imageName;
        $team->save();
    
        return response()->json($team);
    }

    public function createPlayer(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'last_name' => 'required',
            'in_game_name' => 'required',
            'team_id' => 'required',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);
    
        $imageName = time() . '.' . $request->file('logo')->extension(); 
        $request->file('logo')->move(public_path('storage/players'), $imageName);
    
        $player = new Players();
        $player->name = $request->name;
        $player->last_name = $request->last_name;
        $player->in_game_name = $request->in_game_name;
        $player->team_id = $request->team_id;
        $player->logo = $imageName;
        $player->points = 0;
        $player->save();
    
        return response()->json($player);
    }
    public function getTeamInfo($teamId)
    {
        $team = Teams::where('id', $teamId)->first(); 
        $players = Players::where('team_id', $teamId)->get(); 
        
        $Teamgames = TeamResult::where('team_id', $teamId)->latest()->take(3)->pluck('game_id');

        $games = GameResults::whereIn('id', $Teamgames)->get();

        $gamesData = [];
        foreach ($games as $game) {
            $tournament = Tournaments::where('id', $game->tournament_id)->value('name');
            $teamResults = TeamResult::where('game_id', $game->id)->get();
            $results = $teamResults->map(function ($result) {
                $team = Teams::find($result->team_id);
                return [
                    'team_id' => $result->team_id,
                    'team_name' => $team->name,
                    'team_logo' => $team->logo,
                    'score' => $result->score,
                ];
            });
    
            $gamesData[] = [
                'game_id' => $game->id,
                'game_name' => $game->gameName, 
                'results' => $results,
                'tournament' => $tournament,
            ];
        }
    
        return response()->json([
            'team' => $team,
            'players' => $players,
            'games' => $gamesData
        ]);
    }
}
