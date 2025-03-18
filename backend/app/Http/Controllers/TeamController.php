<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teams;
use App\Models\Players;

class TeamController extends Controller
{
    public function getTeams()
    {
        $teams = Teams::all()->map(function ($team) {
            return [
                'name' => $team->name,
                'logo' => asset("storage/teams/{$team->logo}"),
            ];
        });

        return response()->json($teams);
    }

    public function getPlayers()
    {
        $players = Players::all()->map(function ($player) {
            return [
                'in_game_name' => $player->in_game_name,
                'logo' => asset("storage/players/{$player->logo}"),
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
    
        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }
    
        return response()->json([
            'team' => $team,
            'players' => $players
        ]);
    }
}
