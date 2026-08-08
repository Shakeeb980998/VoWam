<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDetail extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'mobile_number',
        'gender',
        'date_of_birth',
        'address',
        'profile_photo_url',
        'department_id',
        'designation_id',
        'reporting_manager_id',
    ];

    /**
     * Get the user that owns these details.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
