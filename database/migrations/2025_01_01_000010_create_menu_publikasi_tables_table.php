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
        Schema::create('menu_publikasi_tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'id');
            $table->timestamps();
            
            $table->string('judul');
            $table->string('nomor_publikasi')->nullable();
            $table->string('nomor_issn')->nullable();
            $table->date('tanggal_rilis')->nullable();
            $table->integer('ukuran_file');
            $table->integer('jumlah_halaman');
            $table->text('keterangan');
            $table->string('file');
            $table->foreignId('produsen_data_table_id')->constrained('produsen_data_tables', 'id');
            $table->text('abstraksi');
            $table->string('cover');
            $table->string('status', 20)->default('Private');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_publikasi_tables');
    }
};