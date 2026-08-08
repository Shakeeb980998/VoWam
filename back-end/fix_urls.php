<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    DB::statement("UPDATE users SET avatar_url = REPLACE(avatar_url, 'http://localhost/storage', 'http://localhost:8000/storage') WHERE avatar_url IS NOT NULL");
    DB::statement("UPDATE user_details SET profile_photo_url = REPLACE(profile_photo_url, 'http://localhost/storage', 'http://localhost:8000/storage') WHERE profile_photo_url IS NOT NULL");
    echo "URLs updated successfully!\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
