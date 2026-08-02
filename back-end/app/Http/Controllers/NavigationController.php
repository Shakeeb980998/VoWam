<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NavigationController extends Controller
{
    /**
     * Retrieve the navigation menu structure.
     */
    public function index(Request $request)
    {
        // For now, return the full navigation list.
        // In the future, this can be filtered based on $request->user()->roles/permissions.
        
        $navigation = config('navigation.navigation', []);
        
        return response()->json([
            'navigation' => $navigation
        ]);
    }
}
