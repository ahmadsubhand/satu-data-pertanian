<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenuPublikasiTable extends Model
{
    use HasFactory;

    protected $table = 'menu_publikasi_tables';

    protected $fillable = [
        'user_id',
        'judul',
        'nomor_publikasi',
        'nomor_issn',
        'tanggal_rilis',
        'ukuran_file',
        'jumlah_halaman',
        'keterangan',
        'file',
        'produsen_data_table_id',
        'abstraksi',
        'cover',
        'status'
    ];

    protected $casts = [
        'tanggal_rilis' => 'date',
        'ukuran_file' => 'integer',
        'jumlah_halaman' => 'integer',
        'status' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function produsenDataTable(): BelongsTo
    {
        return $this->belongsTo(ProdusenDataTable::class, 'produsen_data_table_id');
    }
}