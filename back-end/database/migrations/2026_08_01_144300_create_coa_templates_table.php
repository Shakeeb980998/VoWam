<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coa_templates', function (Blueprint $table) {
            $table->id();
            $table->string('industry_code')->index();
            $table->string('account_code');
            $table->string('account_name');
            $table->string('account_type');
            $table->string('parent_code')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coa_templates');
    }
};
