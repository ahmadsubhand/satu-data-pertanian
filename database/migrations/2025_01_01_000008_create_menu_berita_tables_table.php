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
        Schema::create('menu_berita_tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'id');
            $table->timestamps();
            
            $table->string('judul');
            $table->date('tanggal_rilis');
            $table->string('isi_singkat');
            $table->text('isi');
            $table->string('file');
            $table->string('foto');
            $table->string('status', 20)->default('Private');
            $table->foreignId('produsen_data_table_id')->constrained('produsen_data_tables', 'id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_berita_tables');
    }
};