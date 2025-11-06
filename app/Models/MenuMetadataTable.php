<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuMetadataTable extends Model
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
        'tanggal_rilis',
        'abstraksi',
        'produsen_data_table_id',
        'is_data_prioritas',
        'kategori_data_table_id',
        'link_meta',
        'file_meta1',
        'file_meta2',
        'file_meta3',
        'ukuran_file',
        'file_statistik',
    ];

    /**
     * Get the user that owns the metadata.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the produsen data for this metadata.
     */
    public function produsenDataTable()
    {
        return $this->belongsTo(ProdusenDataTable::class, 'produsen_data_table_id');
    }

    /**
     * Get the category for this metadata.
     */
    public function kategoriDataTable()
    {
        return $this->belongsTo(KategoriDataTable::class, 'kategori_data_table_id');
    }
}