<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    // Tenants reside in the central database
    protected $connection = 'mysql';

    protected $fillable = [
        'name',
        'subdomain',
        'database_name',
    ];

    /**
     * Users belonging to this tenant.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
