<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tournaments;
class TournamentController extends Controller
{
    public function createTournament(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'type' => 'required',
            'location' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $tournament = new Tournaments();
        $tournament->name = $request->name;
        $tournament->type = $request->type;
        $tournament->location = $request->location;
        $tournament->start_date = $request->start_date;
        $tournament->end_date = $request->end_date;
        $tournament->save();

        return response()->json($tournament);
    }

    public function getTournaments()
    {
        $tournaments = Tournaments::all();
        return response()->json($tournaments);
    }
    public function getTournamentInfo($tournamentId)
    {
        $tournament = Tournaments::find($tournamentId);
        if (!$tournament) {
            return response()->json(['message' => 'Tournament not found'], 404);
        }
        return response()->json($tournament);
    }
}
