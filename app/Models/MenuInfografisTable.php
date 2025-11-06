<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuInfografisTable extends Model
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
        'keterangan',
        'file',
        'produsen_data_table_id',
        'status',
    ];

    /**
     * Get the user that owns the infografis.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the produsen data for this infografis.
     */
    public function produsenDataTable()
    {
        return $this->belongsTo(ProdusenDataTable::class, 'produsen_data_table_id');
    }
}