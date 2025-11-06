<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role',
    ];

    /**
     * Get the users for this role.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'user_role_id');
    }

    /**
     * Get the user menu role relations for this role.
     */
    public function userMenuUserRoles()
    {
        return $this->hasMany(UserMenuUserRole::class, 'user_role_id');
    }
}