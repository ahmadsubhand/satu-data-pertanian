<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InfografisController extends Controller
{
    public function index(): Response
    {
        // Dummy data for infografis
        $infografis = [
            [
                'id' => 1,
                'judul' => 'Statistik Pembangunan 2023',
                'deskripsi' => 'Infografis menunjukkan perkembangan pembangunan infrastruktur tahun 2023',
                'tanggal_publikasi' => '2023-10-15',
                'status' => 'aktif',
                'kategori' => 'Pembangunan',
                'url_gambar' => 'https://placehold.co/600x400/3498db/ffffff?text=Statistik+Pembangunan',
                'created_at' => '2023-10-15 09:30:00',
                'updated_at' => '2023-10-15 09:30:00'
            ],
            [
                'id' => 2,
                'judul' => 'Data Pendidikan Terkini',
                'deskripsi' => 'Visualisasi data pendidikan di wilayah ini berdasarkan tahun ajaran 2023',
                'tanggal_publikasi' => '2023-10-16',
                'status' => 'aktif',
                'kategori' => 'Pendidikan',
                'url_gambar' => 'https://placehold.co/600x400/2ecc71/ffffff?text=Data+Pendidikan',
                'created_at' => '2023-10-16 14:20:00',
                'updated_at' => '2023-10-16 14:20:00'
            ],
            [
                'id' => 3,
                'judul' => 'Tren Teknologi Pelayanan Publik',
                'deskripsi' => 'Grafik perkembangan penerapan teknologi dalam pelayanan publik 5 tahun terakhir',
                'tanggal_publikasi' => '2023-10-17',
                'status' => 'aktif',
                'kategori' => 'Teknologi',
                'url_gambar' => 'https://placehold.co/600x400/e74c3c/ffffff?text=Tren+Teknologi',
                'created_at' => '2023-10-17 11:15:00',
                'updated_at' => '2023-10-17 11:15:00'
            ]
        ];

        return Inertia::render('admin/infografis/index', [
            'infografis' => $infografis
        ]);
    }
}