<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameResults;
use App\Models\PlayerResults;

class ResultController extends Controller
{
    public function createTeamResult(Request $request)
    {
        // Validate the request data
        $request->validate([
            'tournament_id' => 'required|exists:tournaments,id',
            'team_id' => 'required|exists:teams,id',
            'team_score' => 'required|integer',
        ]);

        // Create a new game result
        $gameResult = new GameResults();
        $gameResult->tournament_id = $request->tournament_id;
        $gameResult->team_id = $request->team_id;
        $gameResult->team_score = $request->team_score;
        $gameResult->save();

        return response()->json($gameResult);
    }
    public function createResults(Request $request){
        
    }
    public function createPlayerResult(Request $request)
    {
        // Validate the request data
        $request->validate([
            'game_result_id' => 'required',
            'player_id' => 'required',
            'kills' => 'required',
            'deaths' => 'required|integer',
            'assists' => 'required|integer',
        ]);

        // Create a new game result
        $playerResult = new PlayerResults();
        $playerResult->game_result_id = $request->game_result_id;
        $playerResult->player_id = $request->player_id;
        $playerResult->kills = $request->kills;
        $playerResult->deaths = $request->deaths;
        $playerResult->assists = $request->assists;
        $playerResult->points = ($request->kills * 3) - ($request->deaths * 2) + $request->assists;
        $playerResult->save();

        return response()->json($playerResult);
    }
}
