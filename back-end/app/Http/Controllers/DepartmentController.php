<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DepartmentController extends Controller
{
    private function getTenantCompanyId(Request $request)
    {
        return \Illuminate\Support\Facades\DB::table('users')
            ->where('central_user_id', $request->user()->id)
            ->value('company_id');
    }

    /**
     * Display a listing of the departments.
     */
    public function index(Request $request)
    {
        $companyId = $this->getTenantCompanyId($request);
        $departments = Department::where('company_id', $companyId)
                     ->orderBy('created_at', 'desc')
                     ->get();
        return response()->json(['data' => $departments]);
    }

    /**
     * Store a newly created department in storage.
     */
    public function store(Request $request)
    {
        $companyId = $this->getTenantCompanyId($request);

        $validated = $request->validate([
            'code' => [
                'required', 
                'string', 
                'max:255', 
                Rule::unique('departments', 'code')->where('company_id', $companyId)
            ],
            'description' => ['nullable', 'string'],
        ]);

        $validated['company_id'] = $companyId;

        $department = Department::create($validated);

        return response()->json([
            'message' => 'Department created successfully',
            'data' => $department
        ], 201);
    }

    /**
     * Update the specified department in storage.
     */
    public function update(Request $request, Department $department)
    {
        $companyId = $this->getTenantCompanyId($request);

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('departments', 'code')
                    ->where('company_id', $companyId)
                    ->ignore($department->id),
            ],
            'description' => ['nullable', 'string'],
        ]);

        $department->update($validated);

        return response()->json([
            'message' => 'Department updated successfully',
            'data' => $department
        ]);
    }

    /**
     * Remove the specified department from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();

        return response()->json([
            'message' => 'Department deleted successfully'
        ]);
    }
}
