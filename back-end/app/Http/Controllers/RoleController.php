<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    private function getTenantCompanyId(Request $request)
    {
        return \Illuminate\Support\Facades\DB::table('users')
            ->where('central_user_id', $request->user()->id)
            ->value('company_id');
    }

    /**
     * Display a listing of the roles.
     */
    public function index(Request $request)
    {
        $companyId = $this->getTenantCompanyId($request);
        $roles = Role::where('company_id', $companyId)
                     ->orderBy('created_at', 'desc')
                     ->get();
        return response()->json(['data' => $roles]);
    }

    /**
     * Store a newly created role in storage.
     */
    public function store(Request $request)
    {
        $companyId = $this->getTenantCompanyId($request);

        $validated = $request->validate([
            'code' => [
                'required', 
                'string', 
                'max:255', 
                Rule::unique('roles', 'code')->where('company_id', $companyId)
            ],
            'description' => ['nullable', 'string'],
        ]);

        $validated['company_id'] = $companyId;

        $role = Role::create($validated);

        return response()->json([
            'message' => 'Role created successfully',
            'data' => $role
        ], 201);
    }

    /**
     * Update the specified role in storage.
     */
    public function update(Request $request, Role $role)
    {
        $companyId = $this->getTenantCompanyId($request);

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'code')
                    ->where('company_id', $companyId)
                    ->ignore($role->id),
            ],
            'description' => ['nullable', 'string'],
        ]);

        $role->update($validated);

        return response()->json([
            'message' => 'Role updated successfully',
            'data' => $role
        ]);
    }

    /**
     * Remove the specified role from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return response()->json([
            'message' => 'Role deleted successfully'
        ]);
    }

    /**
     * Get the navigations assigned to the role.
     */
    public function getNavigations($id)
    {
        $role = Role::findOrFail($id);
        $navigations = $role->navigations()->pluck('navigation_key');
        return response()->json(['data' => $navigations]);
    }

    /**
     * Sync navigations for the role.
     */
    public function syncNavigations(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $validated = $request->request->all();
        // Since request->validate strips if not explicitly defined, let's get the keys
        $navKeys = $request->input('navigation_keys', []);

        // 1. Sync Navigations
        $role->navigations()->delete();

        $navigations = [];
        foreach ($navKeys as $key) {
            $navigations[] = [
                'role_id' => $role->id,
                'navigation_key' => $key,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        if (count($navigations) > 0) {
            \App\Models\RoleNavigation::insert($navigations);
        }

        // 2. Sync Permissions based on selected Navigations
        $configPermissions = config('navigation.permissions', []);
        
        // Find all permission names associated with the selected navigation keys
        $permissionNames = [];
        foreach ($configPermissions as $perm) {
            if (in_array($perm['key'], $navKeys)) {
                $permissionNames[] = $perm['permission_name'];
            }
        }
        $permissionNames = array_unique($permissionNames);

        // Ensure permissions exist in the `permissions` table
        foreach ($permissionNames as $name) {
            \Illuminate\Support\Facades\DB::table('permissions')->updateOrInsert(
                ['name' => $name, 'guard_name' => 'web'],
                ['created_at' => now(), 'updated_at' => now()]
            );
        }

        // Get IDs of these permissions
        $permissionIds = [];
        if (count($permissionNames) > 0) {
            $permissionIds = \Illuminate\Support\Facades\DB::table('permissions')
                ->whereIn('name', $permissionNames)
                ->pluck('id')
                ->toArray();
        }

        // Sync `role_has_permissions`
        \Illuminate\Support\Facades\DB::table('role_has_permissions')->where('role_id', $role->id)->delete();

        $rolePermissions = [];
        foreach ($permissionIds as $pId) {
            $rolePermissions[] = [
                'role_id' => $role->id,
                'permission_id' => $pId,
            ];
        }

        if (count($rolePermissions) > 0) {
            \Illuminate\Support\Facades\DB::table('role_has_permissions')->insert($rolePermissions);
        }

        return response()->json(['message' => 'Navigations and permissions synced successfully']);
    }
}
