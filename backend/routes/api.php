<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');
Route::get('/teams', [TeamController::class, 'getTeams']);
Route::get('/players', [TeamController::class, 'getPlayers']);
Route::get('/getTeamInfo/{teamId}', [TeamController::class, 'getTeamInfo']);
Route::post('/createTeam', [TeamController::class, 'createTeam']);
Route::post('/createPlayer', [TeamController::class, 'createPlayer']);
//tournaments
Route::post('/createTournament', [TournamentController::class, 'createTournament']);
Route::get('/getTournaments', [TournamentController::class, 'getTournaments']);
Route::get('/getTournamentInfo/{tournamentId}', [TournamentController::class, 'getTournamentInfo']);
//fantasy team


//results
Route::post('/createGameResult', [ResultController::class, 'createGameResult']);
Route::post('/createPlayerResult', [ResultController::class, 'createPlayerResult']);
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
