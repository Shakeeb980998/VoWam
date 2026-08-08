<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $fillable = [
        'company_id',
        'code',
        'description',
    ];

    /**
     * Get the navigations assigned to the role.
     */
    public function navigations()
    {
        return $this->hasMany(RoleNavigation::class);
    }

    /**
     * Users associated with this role.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
