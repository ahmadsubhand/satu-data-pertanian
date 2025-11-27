<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuLinkTable;
use App\Models\User;

class MenuLinkTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data from spec.txt
        $linksData = [
            [
                'id' => 1,
                'link' => 'https://panelharga.bkp.pertanian.go.id/',
                'nama' => 'Panel Harga',
                'status' => 0, // 0 means inactive/disabled based on status_link
                'foto' => 'logo_panel_harga.png',
            ],
            [
                'id' => 2,
                'link' => 'http://database.pertanian.go.id/eksim/index1.asp',
                'nama' => 'Basis Data Ekspor - Impor',
                'status' => 1, // 1 means active/enabled
                'foto' => 'logo_pertanian.png',
            ],
            [
                'id' => 3,
                'link' => 'http://pusatkkp.bkp.pertanian.go.id/nbm/',
                'nama' => 'Neraca Bahan Makanan',
                'status' => 0,
                'foto' => 'logo_pertanian.png',
            ],
            [
                'id' => 4,
                'link' => 'http://app2.bkp.pertanian.go.id/',
                'nama' => 'FSVA',
                'status' => 0,
                'foto' => 'logo_pertanian.png',
            ],
            [
                'id' => 5,
                'link' => 'http://pusatkkp.bkp.pertanian.go.id/simonstok/',
                'nama' => 'Pusat Distribusi dan Akses Pangan',
                'status' => 0,
                'foto' => 'logo_simontok.png',
            ],
            [
                'id' => 6,
                'link' => 'http://pusatkkp.bkp.pertanian.go.id/skpg/',
                'nama' => 'Sistem Kewaspadaan Pangan dan Gizi',
                'status' => 0,
                'foto' => 'logo_pertanian.png',
            ],
            [
                'id' => 7,
                'link' => 'https://simpeldatin.setjen.pertanian.go.id/',
                'nama' => 'SIMPELDATIN',
                'status' => 1,
                'foto' => 'logo_pertanian.png',
            ],
            [
                'id' => 14,
                'link' => 'asfasf',
                'nama' => 'asfafas',
                'status' => 0,
                'foto' => 'logo_simontok.png',
            ],
            [
                'id' => 15,
                'link' => 'dfsdfsdf',
                'nama' => 'fsdfsdf',
                'status' => 0,
                'foto' => 'logo_simontok.png',
            ],
        ];

        foreach ($linksData as $data) {
            // Cari user - kita akan gunakan user default karena tidak disebutkan di spec.txt
            $user = User::first(); // Gunakan user pertama sebagai default

            MenuLinkTable::create([
                'id' => $data['id'],
                'user_id' => $user->id,
                'link' => $data['link'],
                'nama' => $data['nama'],
                'status' => $data['status'],
                'foto' => $data['foto'],
            ]);
        }
    }
}