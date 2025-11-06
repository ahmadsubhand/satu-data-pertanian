<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMenuUserRole extends Model
{
    use HasFactory;

    protected $table = 'user_menu_user_role';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_role_id',
        'user_menu_id',
    ];

    /**
     * Get the user role for this relation.
     */
    public function userRole()
    {
        return $this->belongsTo(UserRole::class, 'user_role_id');
    }

    /**
     * Get the user menu for this relation.
     */
    public function userMenu()
    {
        return $this->belongsTo(UserMenu::class, 'user_menu_id');
    }
}