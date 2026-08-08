<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('legal_name')->nullable()->after('name');
            $table->string('registration_number')->nullable()->after('legal_name');
            $table->string('tax_id')->nullable()->after('registration_number');
            $table->string('contact_email')->nullable()->after('tax_id');
            $table->string('contact_phone')->nullable()->after('contact_email');
            $table->string('website_url')->nullable()->after('contact_phone');
            $table->text('address')->nullable()->after('website_url');
            $table->string('city')->nullable()->after('address');
            $table->string('state')->nullable()->after('city');
            $table->string('zip_code')->nullable()->after('state');
            $table->string('country')->nullable()->after('zip_code');
            $table->string('logo_path')->nullable()->after('country');
            $table->string('timezone')->default('UTC')->after('fiscal_year_start');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn([
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
                'timezone'
            ]);
        });
    }
};
