<?php

namespace App\Services;

use App\Models\Tenant;
use Illuminate\Support\Facades\DB;

class TenantManager
{
    protected ?Tenant $currentTenant = null;

    /**
     * Switch context to the given tenant.
     */
    public function switchToTenant(Tenant $tenant): void
    {
        $this->currentTenant = $tenant;

        // Set the database name for the tenant connection
        config(['database.connections.tenant.database' => $tenant->database_name]);

        // Purge the tenant connection to clear internal cache and apply new config
        DB::purge('tenant');

        // Set 'tenant' as the default database connection for current request
        DB::setDefaultConnection('tenant');
    }

    /**
     * Get the active tenant.
     */
    public function getCurrentTenant(): ?Tenant
    {
        return $this->currentTenant;
    }

    /**
     * Determine if a tenant has been loaded.
     */
    public function isTenantActive(): bool
    {
        return $this->currentTenant !== null;
    }
}
