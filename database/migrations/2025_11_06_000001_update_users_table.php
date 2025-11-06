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
        Schema::table('users', function (Blueprint $table) {
            $table->string('nip')->after('id')->nullable();
            $table->string('nama_lengkap')->after('nip')->nullable();
            $table->string('eselon')->after('nama_lengkap')->nullable();
            $table->string('kodeunker')->after('eselon')->nullable();
            $table->string('unit_kerja')->after('kodeunker')->nullable();
            $table->string('hp')->after('unit_kerja')->nullable();
            $table->string('username')->after('hp')->unique()->nullable();
            $table->foreignId('user_role_id')->after('remember_token')->nullable();
            $table->index('user_role_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['user_role_id']);
            $table->dropColumn(['user_role_id', 'nip', 'nama_lengkap', 'eselon', 'kodeunker', 'unit_kerja', 'hp', 'username']);
        });
    }
};