<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuMultimediaTable extends Model
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
        'keterangan',
        'link_video',
        'tanggal_rilis',
        'file',
        'status',
    ];

    /**
     * Get the user that owns the multimedia.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}