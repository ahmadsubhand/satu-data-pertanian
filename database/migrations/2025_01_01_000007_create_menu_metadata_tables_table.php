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
        Schema::create('menu_metadata_tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'id');
            $table->timestamps();
            
            $table->string('judul');
            $table->date('tanggal_rilis');
            $table->text('abstraksi');
            $table->foreignId('produsen_data_table_id')->constrained('produsen_data_tables', 'id');
            $table->boolean('is_data_prioritas')->default(false);
            $table->foreignId('kategori_data_table_id')->constrained('kategori_data_tables', 'id');
            $table->string('link_meta');
            $table->string('file_meta1');
            $table->string('file_meta2');
            $table->string('file_meta3');
            $table->integer('ukuran_file');
            $table->string('file_statistik');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_metadata_tables');
    }
};