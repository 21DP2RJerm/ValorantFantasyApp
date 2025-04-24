<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameResults;
use App\Models\PlayerResults;

class ResultController extends Controller
{
    public function createGameResult(Request $request)
    {
        // Validate the request data
        $request->validate([
            'tournament_id' => 'required|exists:tournaments,id',
            'team1_id' => 'required|exists:teams,id',
            'team2_id' => 'required|exists:teams,id',
            'team1_score' => 'required|integer',
            'team2_score' => 'required|integer',
            'maps' => 'required|array',
        ]);

        // Create a new game result
        $gameResult = new GameResults();
        $gameResult->tournament_id = $request->tournament_id;
        $gameResult->team1_id = $request->team1_id;
        $gameResult->team2_id = $request->team2_id;
        $gameResult->score_team1 = $request->team1_score;
        $gameResult->score_team2 = $request->team2_score;
        $gameResult->maps = json_encode($request->maps);
        $gameResult->save();

        return response()->json($gameResult);
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
