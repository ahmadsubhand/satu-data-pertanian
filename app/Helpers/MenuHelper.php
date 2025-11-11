<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\UserMenu;

class MenuHelper
{
    /**
     * Get the first accessible menu for the authenticated user based on their role
     * 
     * @return string|null The route name of the first accessible menu or null if none found
     */
    public static function getFirstAccessibleMenu()
    {
        if (!Auth::check()) {
            return null;
        }

        $userRoleId = Auth::user()->user_role_id;

        // Get all menus ordered by their ID to ensure consistent ordering
        $menus = UserMenu::orderBy('id')->get();

        foreach ($menus as $menu) {
            $hasAccess = DB::table('user_menu_user_role')
                ->where([
                    'user_menu_id' => $menu->id,
                    'user_role_id' => $userRoleId
                ])
                ->exists();

            if ($hasAccess) {
                // Map menu name to route name based on routes defined in routes/admin/admin.php
                switch ($menu->menu) {
                    case 'Menu Admin':
                        return 'admin-user';
                    case 'Data':
                        return 'admin-data';
                    case 'Berita':
                        return 'admin-berita';
                    case 'Infografis':
                        return 'admin-infografis';
                    case 'Publikasi':
                        return 'admin-publikasi';
                    case 'Verifikasi Data Prioritas':
                        return 'admin-verifikasi-data-prioritas';
                    case 'Foto/Video':
                        return 'admin-foto-video';
                    case 'Verifikasi All Data':
                        return 'admin-verifikasi-all-data';
                    default:
                        // Fallback for any other menu names
                        $menuName = strtolower($menu->menu);
                        $menuName = str_replace(' ', '-', $menuName);
                        return 'admin-' . $menuName;
                }
            }
        }

        return null; // No accessible menu found
    }
}