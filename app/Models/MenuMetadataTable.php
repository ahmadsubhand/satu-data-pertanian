<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenuMetadataTable extends Model
{
    use HasFactory;

    protected $table = 'menu_metadata_tables';

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
        'file_statistik'
    ];

    protected $casts = [
        'tanggal_rilis' => 'date',
        'is_data_prioritas' => 'boolean',
        'ukuran_file' => 'integer'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function produsenDataTable(): BelongsTo
    {
        return $this->belongsTo(ProdusenDataTable::class, 'produsen_data_table_id');
    }

    public function kategoriDataTable(): BelongsTo
    {
        return $this->belongsTo(KategoriDataTable::class, 'kategori_data_table_id');
    }
}