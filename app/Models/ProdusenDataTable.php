<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdusenDataTable extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'value',
    ];

    /**
     * Get the metadata records for this produsen.
     */
    public function menuMetadataTables()
    {
        return $this->hasMany(MenuMetadataTable::class, 'produsen_data_table_id');
    }

    /**
     * Get the berita records for this produsen.
     */
    public function menuBeritaTables()
    {
        return $this->hasMany(MenuBeritaTable::class, 'produsen_data_table_id');
    }

    /**
     * Get the infografis records for this produsen.
     */
    public function menuInfografisTables()
    {
        return $this->hasMany(MenuInfografisTable::class, 'produsen_data_table_id');
    }

    /**
     * Get the publikasi records for this produsen.
     */
    public function menuPublikasiTables()
    {
        return $this->hasMany(MenuPublikasiTable::class, 'produsen_data_table_id');
    }

    /**
     * Get the multimedia records for this produsen.
     */
    public function menuMultimediaTables()
    {
        return $this->hasMany(MenuMultimediaTable::class, 'produsen_data_table_id');
    }
}