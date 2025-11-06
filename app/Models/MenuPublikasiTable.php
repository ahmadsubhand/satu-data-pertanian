<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuPublikasiTable extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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
        'status',
    ];

    /**
     * Get the user that owns the publikasi.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the produsen data for this publikasi.
     */
    public function produsenDataTable()
    {
        return $this->belongsTo(ProdusenDataTable::class, 'produsen_data_table_id');
    }
}