<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            if (isset($user->status) && $user->status !== 'active') {
                return response()->json([
                    'message' => 'Your account is disabled. Please contact support.'
                ], 403);
            }

            // Create Sanctum Token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Load the tenant relationship
            $user->load('tenant');

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'tenant_id' => $user->tenant_id,
                    'tenant_name' => $user->tenant ? $user->tenant->name : null,
                ]
            ]);
        }

        return response()->json([
            'message' => 'Invalid email or password.'
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
