<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        // Get users with their details and company/tenant info
        $users = User::with(['details', 'role'])->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($users);
    }

    /**
     * Get all dependencies for the User Form in one request.
     */
    public function formDependencies()
    {
        $roles = \App\Models\Role::all();
        $departments = \App\Models\Department::all();
        $designations = \App\Models\Designation::all();
        $managers = User::select('id', 'name', 'email')->get();

        return response()->json([
            'roles' => $roles,
            'departments' => $departments,
            'designations' => $designations,
            'managers' => $managers,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // User Table fields
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')],
            'password' => ['required', 'string', 'min:8'],
            
            // Details Table fields
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'mobile_number' => ['required', 'string', 'max:20'],
            'gender' => ['nullable', 'string', 'in:male,female,other'],
            'date_of_birth' => ['nullable', 'date'],
            'address' => ['nullable', 'string'],
            
            // Employment Dropdowns
            'role_id' => ['nullable', 'exists:roles,id'],
            'department_id' => ['nullable', 'exists:departments,id'],
            'designation_id' => ['nullable', 'exists:designations,id'],
            'reporting_manager_id' => ['nullable', 'exists:users,id'],
            
            // Profile Photo
            'profile_photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        try {
            DB::beginTransaction();

            // 1. Create User
            $user = User::create([
                'central_user_id' => 0, 
                'tenant_id' => null, // Avoid request()->tenant() crash
                'company_id' => $this->getTenantCompanyId(),
                'role_id' => $validated['role_id'] ?? null,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'status' => 'active',
            ]);

            // Handle Profile Photo Upload
            $profilePhotoUrl = null;
            if ($request->hasFile('profile_photo')) {
                $path = $request->file('profile_photo')->store('profile-photos', 'public');
                $profilePhotoUrl = asset(Storage::url($path));
                
                // Also update the avatar_url on main users table to keep it in sync
                $user->update(['avatar_url' => $profilePhotoUrl]);
            }

            // 2. Create User Details
            UserDetail::create([
                'user_id' => $user->id,
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'mobile_number' => $validated['mobile_number'],
                'gender' => $validated['gender'] ?? null,
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'address' => $validated['address'] ?? null,
                'profile_photo_url' => $profilePhotoUrl,
                'department_id' => $validated['department_id'] ?? null,
                'designation_id' => $validated['designation_id'] ?? null,
                'reporting_manager_id' => $validated['reporting_manager_id'] ?? null,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user->load(['details', 'role'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            \Illuminate\Support\Facades\Log::error('User creation failed: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified user.
     */
    public function show($id)
    {
        $user = User::with(['details', 'role'])->findOrFail($id);
        return response()->json(['data' => $user]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            // User Table fields
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
            
            // Details Table fields
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'mobile_number' => ['required', 'string', 'max:20'],
            'gender' => ['nullable', 'string', 'in:male,female,other'],
            'date_of_birth' => ['nullable', 'date'],
            'address' => ['nullable', 'string'],
            
            // Employment Dropdowns
            'role_id' => ['nullable', 'exists:roles,id'],
            'department_id' => ['nullable', 'exists:departments,id'],
            'designation_id' => ['nullable', 'exists:designations,id'],
            'reporting_manager_id' => ['nullable', 'exists:users,id'],
            
            // Profile Photo
            'profile_photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        try {
            DB::beginTransaction();

            $userData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'role_id' => $validated['role_id'] ?? null,
            ];

            if (!empty($validated['password'])) {
                $userData['password'] = Hash::make($validated['password']);
            }

            $user->update($userData);

            // Handle Profile Photo Upload
            $profilePhotoUrl = $user->details->profile_photo_url ?? null;
            if ($request->hasFile('profile_photo')) {
                // Delete old photo if exists
                if ($profilePhotoUrl) {
                    $oldPath = str_replace(asset('storage/'), '', $profilePhotoUrl);
                    Storage::disk('public')->delete($oldPath);
                }
                
                $path = $request->file('profile_photo')->store('profile-photos', 'public');
                $profilePhotoUrl = asset(Storage::url($path));
                
                // Also update the avatar_url on main users table
                $user->update(['avatar_url' => $profilePhotoUrl]);
            }

            // Update User Details
            $detail = $user->details;
            if (!$detail) {
                $detail = new UserDetail(['user_id' => $user->id]);
            }
            
            $detail->fill([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'mobile_number' => $validated['mobile_number'],
                'gender' => $validated['gender'] ?? null,
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'address' => $validated['address'] ?? null,
                'profile_photo_url' => $profilePhotoUrl,
                'department_id' => $validated['department_id'] ?? null,
                'designation_id' => $validated['designation_id'] ?? null,
                'reporting_manager_id' => $validated['reporting_manager_id'] ?? null,
            ]);
            $detail->save();

            DB::commit();

            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user->fresh(['details', 'role'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            \Illuminate\Support\Facades\Log::error('User update failed: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $user = User::findOrFail($id);
            
            // Details are cascaded if set up, or delete manually
            if ($user->details) {
                // Delete profile photo
                if ($user->details->profile_photo_url) {
                    $oldPath = str_replace(asset('storage/'), '', $user->details->profile_photo_url);
                    Storage::disk('public')->delete($oldPath);
                }
                $user->details->delete();
            }
            
            $user->delete();
            DB::commit();
            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to delete user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Helper to get tenant company ID safely.
     * This was used in other controllers.
     */
    protected function getTenantCompanyId()
    {
        $userId = auth()->id();
        if (!$userId) return null;
        
        $user = User::where('central_user_id', $userId)->first();
        return $user ? $user->company_id : null;
    }
}
