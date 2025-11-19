<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BeritaController extends Controller
{
    public function index(): Response
    {
        // Dummy data for berita
        $berita = [
            [
                'id' => 1,
                'judul' => 'Berita Terbaru tentang Pembangunan Infrastruktur',
                'konten' => 'Pembangunan infrastruktur terus berlanjut untuk meningkatkan kesejahteraan masyarakat...',
                'tanggal_publikasi' => '2023-10-15',
                'status' => 'aktif',
                'kategori' => 'Pembangunan',
                'penulis' => 'Budi Santoso',
                'created_at' => '2023-10-15 09:30:00',
                'updated_at' => '2023-10-15 09:30:00'
            ],
            [
                'id' => 2,
                'judul' => 'Program Peningkatan Kualitas Pendidikan',
                'konten' => 'Pemerintah meluncurkan program baru untuk meningkatkan kualitas pendidikan di seluruh wilayah...',
                'tanggal_publikasi' => '2023-10-16',
                'status' => 'aktif',
                'kategori' => 'Pendidikan',
                'penulis' => 'Siti Aminah',
                'created_at' => '2023-10-16 14:20:00',
                'updated_at' => '2023-10-16 14:20:00'
            ],
            [
                'id' => 3,
                'judul' => 'Inovasi Teknologi untuk Layanan Publik',
                'konten' => 'Penerapan teknologi terbaru dalam layanan publik meningkatkan efisiensi dan kenyamanan masyarakat...',
                'tanggal_publikasi' => '2023-10-17',
                'status' => 'aktif',
                'kategori' => 'Teknologi',
                'penulis' => 'Ahmad Fauzi',
                'created_at' => '2023-10-17 11:15:00',
                'updated_at' => '2023-10-17 11:15:00'
            ]
        ];

        return Inertia::render('admin/berita/index', [
            'berita' => $berita
        ]);
    }
}