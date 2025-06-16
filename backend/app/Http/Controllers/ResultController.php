<?php

namespace App\Http\Controllers;

use App\Models\FantasyTeam;
use Illuminate\Http\Request;
use App\Models\GameResults;
use App\Models\PlayerResults;
use App\Models\Players;
use App\Models\TeamResult;
use App\Models\Teams;
use App\Models\Tournaments;

class ResultController extends Controller
{
    public function createTeamResult(Request $request)
    {
        $request->validate([
            'tournament_id' => 'required|exists:tournaments,id',
            'team_id' => 'required|exists:teams,id',
            'team_score' => 'required|integer',
        ]);

        $gameResult = new GameResults();
        $gameResult->tournament_id = $request->tournament_id;
        $gameResult->team_id = $request->team_id;
        $gameResult->team_score = $request->team_score;
        $gameResult->save();

        return response()->json($gameResult);
    }
    public function createResults(Request $request){
        $request->validate([
            'tournamentId' => 'required',
            'team1Id'      => 'required',
            'team1Score'   => 'required',
            'team2Id'      => 'required',
            'team2Score'   => 'required',
            'gameName'     => 'required',
            'playerStats'  => 'required',
        ]);
    
        $gameResult = new GameResults();
        $gameResult->tournament_id = $request->tournamentId;
        $gameResult->gameName = $request->gameName;
        $gameResult->save();


        $teamResult = new TeamResult();
        $teamResult->team_id = $request->team1Id;
        $teamResult->score = $request->team1Score;
        $teamResult->game_id = $gameResult->id;
        $teamResult->save();

        $teamResult = new TeamResult();
        $teamResult->team_id = $request->team2Id;
        $teamResult->score = $request->team2Score;
        $teamResult->game_id = $gameResult->id;
        $teamResult->save();

        foreach ($request->playerStats as $playerStat) {
            PlayerResults::create([
                'game_result_id' => $gameResult->id,
                'player_id'      => $playerStat['playerId'], 
                'kills'          => $playerStat['kills'],
                'assists'        => $playerStat['assists'],
                'deaths'         => $playerStat['deaths'],
                'points'         => ($playerStat['kills'] * 3) - ($playerStat['deaths'] * 2) + $playerStat['assists'],
            ]);
        }
        
        $gameResultIds = GameResults::where('tournament_id', $request->tournamentId)->pluck('id');

        foreach(FantasyTeam::where('tournament_id', $request->tournamentId)->get() as $FantasyTeam){
            $FantasyTeam->calculatePoints($request->tournamentId, $gameResultIds);
        }
        return response()->json([
            'success' => true,
            'gameResult' => $gameResult,
        ]);
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

    public function getPlayersResults($playerId)
    {
        $player = Players::find($playerId);

        $playerResults = PlayerResults::where('player_id', $playerId)->latest()->take(20)->get();

        $team = Teams::find($player->team_id);
        $gameData = [];
        foreach($playerResults as $result){
            $gameResult = GameResults::find($result->game_result_id);
            $tournament = Tournaments::find($gameResult->tournament_id);
            $opposingTeamResult = TeamResult::where('game_id', $result->game_result_id)->where('team_id','!=', $team->id)->pluck('team_id');
            $opposingTeam = Teams::find($opposingTeamResult)->value('name');
            $gameData[] = [
                'results' => $result,
                'gameName' => $gameResult->gameName,
                'tournament' => $tournament->name,
                'opposingTeam' => $opposingTeam,
            ];
        }

        return response()->json([
            'player' => [
                'id' => $player->id,
                'name' => $player->name,
                'team_id' => $player->team_id,
                'last_name' => $player->last_name,
                'in_game_name' => $player->in_game_name,
                'logo' => $player->logo,
                'team_name' => $team->name
            ],
            'games' => $gameData
        ]);
    }
}
