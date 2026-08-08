<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    // Companies can reside in central or tenant database depending on context
    // protected $connection = 'mysql'; (removed so it dynamically uses the active connection)

    protected $fillable = [
        'tenant_id',
        'name',
        'legal_name',
        'registration_number',
        'tax_id',
        'contact_email',
        'contact_phone',
        'website_url',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'logo_path',
        'timezone',
        'industry_code',
        'base_currency',
        'fiscal_year_start'
    ];

    /**
     * The tenant this company belongs to.
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Users belonging to this company.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
