<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMenu extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'menu',
        'is_active',
    ];

    /**
     * Get the user menu role relations for this menu.
     */
    public function userMenuUserRoles()
    {
        return $this->hasMany(UserMenuUserRole::class, 'user_menu_id');
    }

    public function userRoles()
    {
        return $this->belongsToMany(
            UserRole::class,
            'user_menu_user_role',
            'user_menu_id',
            'user_role_id'
        );
    }
}