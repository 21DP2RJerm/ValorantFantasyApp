<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameResults;

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
}
