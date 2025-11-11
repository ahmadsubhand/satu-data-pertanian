<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserMenu;
use App\Models\UserRole;
use App\Models\UserMenuUserRole;

class UserMenuUserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define menu permissions for each role based on the provided information
        $roleMenus = [
            'Superadmin' => [
                'Menu Admin',
                'Data',
                'Berita',
                'Infografis',
                'Publikasi',
                'Foto/Video',
                'Verifikasi Data Prioritas'
            ],
            'Walidata' => [
                'Foto/Video',
                'Verifikasi Data Prioritas',
                'Publikasi',
                'Data',
                'Berita',
                'Infografis'
            ],
            'Admin Pusdatin' => [
                'Data',
                'Berita',
                'Infografis',
                'Publikasi',
                'Verifikasi Data Prioritas',
                'Foto/Video'
            ],
            'Pembina Data' => [
                'Verifikasi Data Prioritas'
            ],
            'Produsen Data' => [
                'Data',
                'Berita',
                'Infografis',
                'Publikasi'
            ]
        ];

        foreach ($roleMenus as $roleName => $menuNames) {
            $role = UserRole::where('role', $roleName)->first();
            if (!$role) {
                // If role doesn't exist, create it
                $role = UserRole::create(['role' => $roleName]);
            }

            foreach ($menuNames as $menuName) {
                $menu = UserMenu::where('menu', $menuName)->first();
                if (!$menu) {
                    // If menu doesn't exist, create it
                    $menu = UserMenu::create(['menu' => $menuName, 'is_active' => true]);
                }

                // Create the relationship if it doesn't exist
                UserMenuUserRole::firstOrCreate([
                    'user_role_id' => $role->id,
                    'user_menu_id' => $menu->id,
                ]);
            }
        }
    }
}