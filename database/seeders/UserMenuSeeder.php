<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserMenu;

class UserMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            ['menu' => 'Menu Admin'],
            ['menu' => 'Data'],
            ['menu' => 'Berita'],
            ['menu' => 'Infografis'],
            ['menu' => 'Publikasi'],
            ['menu' => 'Verifikasi Data Prioritas'],
            ['menu' => 'Foto/Video'],
            ['menu' => 'Verifikasi All Data'],
        ];

        foreach ($menus as $menu) {
            UserMenu::create($menu);
        }
    }
}