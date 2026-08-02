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
}
