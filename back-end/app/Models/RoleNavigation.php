<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoleNavigation extends Model
{
    protected $fillable = [
        'role_id',
        'navigation_key',
    ];

    /**
     * Get the role that owns the navigation access.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
}
