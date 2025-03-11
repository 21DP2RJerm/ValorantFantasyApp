<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\Auth\RegisteredUserController;

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
