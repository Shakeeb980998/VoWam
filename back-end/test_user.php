<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    // Attempt to connect to tenant db if possible, or just default
    // We will just run the User::create to see if there's a DB error
    $user = User::create([
        'central_user_id' => 0, 
        'tenant_id' => null,
        'company_id' => null,
        'name' => 'Test User',
        'email' => 'test_'.rand().'@example.com',
        'password' => Hash::make('password123'),
        'status' => 'active',
    ]);
    echo "Success: " . $user->id;
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
