<?php

namespace App\Providers;

use App\Repositories\CompanyRepositoryInterface;
use App\Repositories\Eloquent\CompanyRepository;
use App\Services\TenantManager;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register TenantManager as a singleton to share state across request lifecycle
        $this->app->singleton(TenantManager::class, function ($app) {
            return new TenantManager();
        });

        // Bind Company Repository
        $this->app->bind(CompanyRepositoryInterface::class, CompanyRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Define Tenant-based rate limiter (GAP-024)
        RateLimiter::for('tenant', function (Request $request) {
            $tenantManager = app(TenantManager::class);

            // Use current tenant ID or header or request IP as fallback identifier
            $tenantIdentifier = $tenantManager->getCurrentTenant()?->id
                ?? $request->header('X-Tenant-ID')
                ?? $request->ip();

            $limit = env('TENANT_RATE_LIMIT', 60);

            return Limit::perMinute((int) $limit)->by($tenantIdentifier);
        });
    }
}
