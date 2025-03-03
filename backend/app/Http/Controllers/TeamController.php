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
}
