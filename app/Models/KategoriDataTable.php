<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriDataTable extends Model
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
     * Get the metadata records for this category.
     */
    public function menuMetadataTables()
    {
        return $this->hasMany(MenuMetadataTable::class, 'kategori_data_table_id');
    }
}