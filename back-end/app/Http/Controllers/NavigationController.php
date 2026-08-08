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
        $navigation = config('navigation.navigation', []);
        
        if ($request->query('full')) {
            return response()->json([
                'navigation' => $navigation
            ]);
        }
        
        $user = $request->user();
        $allowedKeys = [];
        
        if ($user) {
            // Retrieve tenant user to get the role_id
            $tenantUser = \Illuminate\Support\Facades\DB::table('users')
                ->where('central_user_id', $user->id)
                ->first();

            if ($tenantUser && $tenantUser->role_id) {
                $allowedKeys = \Illuminate\Support\Facades\DB::table('role_navigations')
                    ->where('role_id', $tenantUser->role_id)
                    ->pluck('navigation_key')
                    ->toArray();
            }
        }

        $filteredNavigation = self::filterNavigation($navigation, $allowedKeys);
        
        return response()->json([
            'navigation' => $filteredNavigation
        ]);
    }

    /**
     * Filter the navigation array based on allowed keys.
     */
    public static function filterNavigation($navigation, $allowedKeys)
    {
        $filtered = [];
        foreach ($navigation as $item) {
            if (isset($item['isTitle']) && $item['isTitle']) {
                $filtered[] = $item;
                continue;
            }

            if (isset($item['children'])) {
                $filteredChildren = self::filterNavigation($item['children'], $allowedKeys);
                if (!empty($filteredChildren)) {
                    $item['children'] = $filteredChildren;
                    $filtered[] = $item;
                }
            } else {
                if (in_array($item['key'], $allowedKeys)) {
                    $filtered[] = $item;
                }
            }
        }
        
        // Clean up empty titles (a title followed by another title or at the end)
        $cleaned = [];
        foreach ($filtered as $i => $item) {
            if (isset($item['isTitle']) && $item['isTitle']) {
                if (!isset($filtered[$i + 1]) || (isset($filtered[$i + 1]['isTitle']) && $filtered[$i + 1]['isTitle'])) {
                    continue;
                }
            }
            $cleaned[] = $item;
        }

        return array_values($cleaned);
    }
}
