<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function profile(){
        $user = Auth::user();

        return response()->json([
            "status" => true,
            "message" => "Profile information",
            "data" => [
                'user' => $user, 
            ]
        ]);
    }
    public function verifyAdmin(Request $request)
{
    $user = $request->user(); 
    
    return response()->json([
        'is_admin' => $user->admin, 
        'user' => $user
    ]);
}
}
