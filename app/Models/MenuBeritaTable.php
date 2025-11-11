<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuBeritaTable extends Model
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
        'isi_singkat',
        'isi',
        'file',
        'foto',
        'status',
        'produsen_data_table_id',
    ];

    /**
     * Get the user that owns the berita.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the produsen data for this berita.
     */
    public function produsenDataTable()
    {
        return $this->belongsTo(ProdusenDataTable::class, 'produsen_data_table_id');
    }
}