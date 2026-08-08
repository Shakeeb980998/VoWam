<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NavigationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Central / Landlord API Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user()->load('tenant');
    });
    
    // Dynamic Navigation Endpoint
    Route::get('/navigation', [NavigationController::class, 'index']);
});

// Tenant-Aware Authenticated Routes
Route::middleware(['auth:sanctum', 'tenant'])->group(function () {
    // Roles Management
    Route::apiResource('roles', RoleController::class);
    // Departments Management
    Route::apiResource('departments', DepartmentController::class);
    // Designations Management
    Route::apiResource('designations', DesignationController::class);
});

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
