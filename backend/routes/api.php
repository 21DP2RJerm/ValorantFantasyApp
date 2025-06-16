<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FantasyTeamController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');
Route::middleware('auth:sanctum')->get('/verifyAdmin', [AuthController::class, 'verifyAdmin']);
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);
Route::get('/teams/{region}', [TeamController::class, 'getRegionTeams']);
Route::get('/allTeams', [TeamController::class, 'getAllTeams']);
Route::get('/tournamentTeams/{tournament}', [TeamController::class, 'getTournamentTeams']);
Route::get('/players', [TeamController::class, 'getPlayers']);
Route::get('/getTeamInfo/{teamId}', [TeamController::class, 'getTeamInfo']);
Route::post('/createTeam', [TeamController::class, 'createTeam']);
Route::post('/createPlayer', [TeamController::class, 'createPlayer']);
Route::post('/updatePlayer/{id}', [TeamController::class, 'updatePlayer']);
Route::post('/updateTeam/{id}', [TeamController::class, 'updateTeam']);
Route::get('/getPlayer/{id}', [TeamController::class, 'getPlayer']);
Route::get('/getTeam/{id}', [TeamController::class, 'getTeam']);
//tournaments
Route::post('/createTournament', [TournamentController::class, 'createTournament']);
Route::get('/getTournaments', [TournamentController::class, 'getTournaments']);
Route::get('/getUnstartedTournaments', [TournamentController::class, 'getUnstartedTournaments']);
Route::get('/getTournamentInfo/{tournamentId}', [TournamentController::class, 'getTournamentInfo']);
Route::get('/getLatestTournamentInfo', [TournamentController::class, 'getLatestTournamentInfo']);
Route::get('/getLeaderboardTournaments', [TournamentController::class, 'getLeaderboardTournaments']);
//fantasy team


//results
Route::post('/createGameResult', [ResultController::class, 'createGameResult']);
Route::post('/createPlayerResult', [ResultController::class, 'createPlayerResult']);
Route::post('/createResults', [ResultController::class, 'createResults']);
Route::get('/getPlayersResults/{playerId}', [ResultController::class, 'getPlayersResults']);

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    return response()->json([
        'token' => $user->createToken('api-token')->plainTextToken,
    ]);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//fantasy teams
Route::middleware('auth:sanctum')->post('/createFantasyTeam', [FantasyTeamController::class, 'createFantasyTeam']);
Route::middleware('auth:sanctum')->get('/getUserFantasyTeams', [FantasyTeamController::class, 'getUserFantasyTeams']);
Route::get('/getFantasyTeams/{tournamentId}', [FantasyTeamController::class, 'getFantasyTeams']);