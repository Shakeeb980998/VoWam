<?php

namespace App\Tenancy;

use Stancl\Tenancy\Bootstrappers\DatabaseTenancyBootstrapper as BaseBootstrapper;
use Stancl\Tenancy\Contracts\Tenant;

class DatabaseTenancyBootstrapper extends BaseBootstrapper
{
    public function bootstrap(Tenant $tenant)
    {
        // Auto-create the database if it doesn't exist
        // This is especially helpful if tenants were inserted manually via raw SQL!
        $database = $tenant->database()->getName();
        
        if (! $tenant->database()->manager()->databaseExists($database)) {
            $tenant->database()->manager()->createDatabase($tenant);
        }
        
        parent::bootstrap($tenant);
    }
}
