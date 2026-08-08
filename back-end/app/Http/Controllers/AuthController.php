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

            $allowedKeys = [];
            if ($user->tenant_id) {
                // We are in the central connection currently, switch to tenant to fetch role navigations
                $tenant = \App\Models\Tenant::find($user->tenant_id);
                if ($tenant) {
                    app(\App\Services\TenantManager::class)->switchToTenant($tenant);
                    
                    // Fetch the tenant user to get their role_id
                    $tenantUser = \Illuminate\Support\Facades\DB::table('users')
                        ->where('central_user_id', $user->id)
                        ->first();

                    if ($tenantUser && $tenantUser->role_id) {
                        try {
                            $allowedKeys = \Illuminate\Support\Facades\DB::table('role_navigations')
                                ->where('role_id', $tenantUser->role_id)
                                ->pluck('navigation_key')
                                ->toArray();
                        } catch (\Exception $e) {
                            // Ignore if tenant DB is not connected during login
                        }
                    }
                }
            }

            $navigation = config('navigation.navigation', []);
            $filteredNavigation = \App\Http\Controllers\NavigationController::filterNavigation($navigation, $allowedKeys);

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'tenant_id' => $user->tenant_id,
                    'tenant_name' => $user->tenant ? $user->tenant->name : null,
                ],
                'navigation' => $filteredNavigation,
                'permissions' => config('navigation.permissions', [])
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
