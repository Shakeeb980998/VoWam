<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DesignationController extends Controller
{
    private function getTenantCompanyId(Request $request)
    {
        return \Illuminate\Support\Facades\DB::table('users')
            ->where('central_user_id', $request->user()->id)
            ->value('company_id');
    }

    /**
     * Display a listing of the designations.
     */
    public function index(Request $request)
    {
        $companyId = $this->getTenantCompanyId($request);
        $designations = Designation::where('company_id', $companyId)
                     ->orderBy('created_at', 'desc')
                     ->get();
        return response()->json(['data' => $designations]);
    }

    /**
     * Store a newly created designation in storage.
     */
    public function store(Request $request)
    {
        $companyId = $this->getTenantCompanyId($request);

        $validated = $request->validate([
            'code' => [
                'required', 
                'string', 
                'max:255', 
                Rule::unique('designations', 'code')->where('company_id', $companyId)
            ],
            'description' => ['nullable', 'string'],
        ]);

        $validated['company_id'] = $companyId;

        $designation = Designation::create($validated);

        return response()->json([
            'message' => 'Designation created successfully',
            'data' => $designation
        ], 201);
    }

    /**
     * Update the specified designation in storage.
     */
    public function update(Request $request, Designation $designation)
    {
        $companyId = $this->getTenantCompanyId($request);

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('designations', 'code')
                    ->where('company_id', $companyId)
                    ->ignore($designation->id),
            ],
            'description' => ['nullable', 'string'],
        ]);

        $designation->update($validated);

        return response()->json([
            'message' => 'Designation updated successfully',
            'data' => $designation
        ]);
    }

    /**
     * Remove the specified designation from storage.
     */
    public function destroy(Designation $designation)
    {
        $designation->delete();

        return response()->json([
            'message' => 'Designation deleted successfully'
        ]);
    }
}
