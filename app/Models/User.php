<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nip',
        'nama_lengkap',
        'eselon',
        'kodeunker',
        'unit_kerja',
        'hp',
        'username',
        'email',
        'password',
        'user_role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the role that owns the user.
     */
    public function userRole()
    {
        return $this->belongsTo(UserRole::class, 'user_role_id');
    }

    /**
     * Get the metadata records for the user.
     */
    public function menuMetadataTables()
    {
        return $this->hasMany(MenuMetadataTable::class, 'user_id');
    }

    /**
     * Get the berita records for the user.
     */
    public function menuBeritaTables()
    {
        return $this->hasMany(MenuBeritaTable::class, 'user_id');
    }

    /**
     * Get the infografis records for the user.
     */
    public function menuInfografisTables()
    {
        return $this->hasMany(MenuInfografisTable::class, 'user_id');
    }

    /**
     * Get the publikasi records for the user.
     */
    public function menuPublikasiTables()
    {
        return $this->hasMany(MenuPublikasiTable::class, 'user_id');
    }

    /**
     * Get the multimedia records for the user.
     */
    public function menuMultimediaTables()
    {
        return $this->hasMany(MenuMultimediaTable::class, 'user_id');
    }
}