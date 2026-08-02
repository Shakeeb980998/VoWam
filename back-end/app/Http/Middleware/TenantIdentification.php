<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Tenant;
use App\Services\TenantManager;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TenantIdentification
{
    protected TenantManager $tenantManager;

    public function __construct(TenantManager $tenantManager)
    {
        $this->tenantManager = $tenantManager;
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $tenantId = $request->header('X-Tenant-ID');
        $tenant = null;

        if ($tenantId) {
            // Find by ID in central database (using its predefined mysql connection)
            $tenant = Tenant::find($tenantId);
        } else {
            // Try to resolve from authenticated user first
            if (auth('sanctum')->check() && auth('sanctum')->user()->tenant_id) {
                $tenant = Tenant::find(auth('sanctum')->user()->tenant_id);
            }
            
            if (!$tenant) {
                // Extract subdomain: e.g. tenant1.vowam.com -> tenant1
                $host = $request->getHost();
                $parts = explode('.', $host);
                if (count($parts) > 2) {
                    $subdomain = $parts[0];
                    if ($subdomain !== 'www' && $subdomain !== 'api') {
                        $tenant = Tenant::where('subdomain', $subdomain)->first();
                    }
                }
            }
        }

        if (!$tenant) {
            return response()->json([
                'error' => 'Tenant identification failed. Please authenticate, provide a valid X-Tenant-ID header, or use a valid tenant subdomain.'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Dynamically switch connection to tenant database
        $this->tenantManager->switchToTenant($tenant);

        return $next($request);
    }
}
