<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Central / Landlord API Routes
|--------------------------------------------------------------------------
|
| These routes run on the default central database connection.
|
*/

Route::apiResource('companies', CompanyController::class);

/*
|--------------------------------------------------------------------------
| Tenant API Routes
|--------------------------------------------------------------------------
|
| These routes are dynamically resolved and run on the tenant's database
| connection. They are protected by the Tenant Identification middleware
| and the tenant-level rate limiter.
|
*/

Route::middleware(['tenant', 'throttle:tenant'])->group(function () {
    // Dynamic tenant route example
    Route::get('/tenant-data', function () {
        // Queries run automatically on the active tenant's database connection
        $users = \Illuminate\Support\Facades\DB::table('users')->get();

        return response()->json([
            'message' => 'Successfully connected to tenant database!',
            'tenant' => app(\App\Services\TenantManager::class)->getCurrentTenant(),
            'users' => $users
        ]);
    });
});
