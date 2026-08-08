<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Company;

class TenantCompanyController extends Controller
{
    /**
     * Retrieve the company configuration for the active tenant.
     */
    public function show(Request $request)
    {
        // Get the current user's company ID (which maps to the active tenant company)
        $centralUser = $request->user();
        
        $companyId = DB::table('users')
            ->where('central_user_id', $centralUser->id)
            ->value('company_id');

        if (!$companyId) {
            return response()->json(['error' => 'Company not found for current user.'], 404);
        }

        $company = Company::find($companyId);
        
        if (!$company) {
             return response()->json(['error' => 'Company details not found.'], 404);
        }

        return response()->json(['data' => $company]);
    }

    /**
     * Update the company configuration for the active tenant.
     */
    public function update(Request $request)
    {
        $centralUser = $request->user();
        
        $companyId = DB::table('users')
            ->where('central_user_id', $centralUser->id)
            ->value('company_id');

        if (!$companyId) {
            return response()->json(['error' => 'Company not found for current user.'], 404);
        }

        $company = Company::findOrFail($companyId);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'legal_name' => 'nullable|string|max:255',
            'registration_number' => 'nullable|string|max:255',
            'tax_id' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'website_url' => 'nullable|url|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:255',
            'timezone' => 'nullable|string|max:255',
            'industry_code' => 'nullable|string|max:255',
            'base_currency' => 'nullable|string|max:3',
            'fiscal_year_start' => 'nullable|date',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($company->logo_path) {
                Storage::disk('public')->delete($company->logo_path);
            }
            // Store new logo
            $path = $request->file('logo')->store('company_logos', 'public');
            $validated['logo_path'] = $path;
        }
        
        // Remove 'logo' from validated array so it doesn't try to save it to DB
        unset($validated['logo']);

        $company->update($validated);

        // Also update the name in the central database companies table if it changed
        // Not strictly necessary depending on the architecture, but good practice if names should sync
        // I will skip central DB sync for now unless requested.

        return response()->json([
            'message' => 'Company information updated successfully.',
            'data' => $company
        ]);
    }
}
