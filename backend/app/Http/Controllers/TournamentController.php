<?php

namespace App\Http\Controllers;

use App\Models\GameResults;
use App\Models\PlayerResults;
use App\Models\Players;
use App\Models\TeamResult;
use App\Models\Teams;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use App\Models\Tournaments;
use App\Models\TournamentTeam;

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
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        $imageName = time() . '.' . $request->file('logo')->extension(); 
        $request->file('logo')->move(public_path('storage/tournaments'), $imageName);
        $tournament = new Tournaments();
        $tournament->name = $request->name;
        $tournament->type = $request->type;
        $tournament->location = $request->location;
        $tournament->start_date = $request->start_date;
        $tournament->end_date = $request->end_date;
        $tournament->logo = $imageName;
        $tournament->save();

        $i = 0;
        foreach($request->teams as $team){
            TournamentTeam::create([
                'tournament_id' => $tournament->id,
                'team_id' => $team,
            ]);
            $i = $i + 1;
        }
        return response()->json($tournament);
    }

    public function getTournaments()
    {
        $tournaments = Tournaments::all();
        return response()->json($tournaments);
    }

    public function getLeaderboardTournaments()
    {
    
        $tournaments = Tournaments::where('start_date', '<', Carbon::now())
        ->where('end_date', '>', Carbon::now()->subWeek())->get();
    
        return response()->json($tournaments);
    }
    public function getUnstartedTournaments()
    {
        $tournaments = Tournaments::where('start_date', '>', Carbon::now())->get();
        return response()->json($tournaments);
    }
    public function getTournamentInfo($tournamentId)
    {
        $tournament = Tournaments::find($tournamentId);


        $tournamentTeams = TournamentTeam::where('tournament_id', $tournamentId)->pluck('team_id')->toArray();
        $teams = Teams::whereIn('id', $tournamentTeams)->get();
    
        $games = GameResults::where('tournament_id', $tournamentId)->latest()->take(3)->get();

        $gamesData = [];
        foreach ($games as $game) {

            $teamResults = TeamResult::where('game_id', $game->id)->get();
    
            $results = $teamResults->map(function ($result) {
                $team = Teams::find($result->team_id);
                return [
                    'team_id' => $result->team_id,
                    'team_name' => $team->name,
                    'team_logo' => $team->logo,
                    'score' => $result->score
                ];
            });
    
            $gamesData[] = [
                'game_id' => $game->id,
                'game_name' => $game->gameName, 
                'results' => $results
            ];
        }
    
        return response()->json([
            'tournament' => $tournament,
            'teams' => $teams,
            'games' => $gamesData
        ]);
    }
    public function getLatestTournamentInfo()
    {
        $tournament = Tournaments::where('start_date', '<=', Carbon::now())->whereHas('games')
            ->inRandomOrder()
            ->first();

        $games = GameResults::where('tournament_id', $tournament->id)->latest()->take(3)->get();
        $gameIds = $games->pluck('id');
        $playerResults = PlayerResults::whereIn('game_result_id', $gameIds)->get();
        $grouped = $playerResults->groupBy('player_id');

        $bestPlayer = null;
        $bestRatio = -1;

        foreach ($grouped as $playerId => $results) {
            $totalKills = $results->sum('kills');
            $totalDeaths = $results->sum('deaths');
    
            $ratio = $totalDeaths > 0 ? $totalKills / $totalDeaths : $totalKills;
    
            if ($ratio > $bestRatio) {
                $bestRatio = $ratio;
                $bestPlayer = $playerId;
            }
        }
    
        $topPlayer = null;
        if ($bestPlayer) {
            $player = Players::find($bestPlayer);
            $topPlayer = [
                'id' => $player->id,
                'name' => $player->in_game_name,
                'image' => $player->logo, // adjust if you use avatar/profile_picture
                'kills_deaths_ratio' => round($bestRatio, 2)
            ];
        }

        $gamesData = [];
        foreach ($games as $game) {
            $teamResults = TeamResult::where('game_id', $game->id)->get();

            $results = $teamResults->map(function ($result) {
                $team = Teams::find($result->team_id);
                return [
                    'team_id' => $result->team_id,
                    'team_name' => $team->name,
                    'team_logo' => $team->logo,
                    'score' => $result->score
                ];
            });

            $gamesData[] = [
                'game_id' => $game->id,
                'game_name' => $game->gameName,
                'results' => $results
            ];
        }

        return response()->json([
            'tournament' => $tournament,
            'games' => $gamesData,
            'top_player' => $topPlayer
        ]);
    }
}
