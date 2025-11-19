<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FotoVideoController extends Controller
{
    public function index(): Response
    {
        // Dummy data for foto/video
        $fotovideo = [
            [
                'id' => 1,
                'judul' => 'Proses Pembangunan Jembatan Baru',
                'deskripsi' => 'Dokumentasi foto proses pembangunan jembatan yang menghubungkan dua wilayah',
                'tanggal_upload' => '2023-10-15',
                'status' => 'aktif',
                'kategori' => 'Pembangunan',
                'jenis_media' => 'foto',
                'url_media' => 'https://placehold.co/600x400/3498db/ffffff?text=Jembatan+Baru',
                'created_at' => '2023-10-15 09:30:00',
                'updated_at' => '2023-10-15 09:30:00'
            ],
            [
                'id' => 2,
                'judul' => 'Video Pengarahan Pembangunan Infrastruktur',
                'deskripsi' => 'Video sambutan kepala dinas dalam pengarahan proyek pembangunan infrastruktur',
                'tanggal_upload' => '2023-10-16',
                'status' => 'aktif',
                'kategori' => 'Pengarahan',
                'jenis_media' => 'video',
                'url_media' => 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                'created_at' => '2023-10-16 14:20:00',
                'updated_at' => '2023-10-16 14:20:00'
            ],
            [
                'id' => 3,
                'judul' => 'Galeri Kegiatan Edukasi Masyarakat',
                'deskripsi' => 'Kumpulan foto kegiatan edukasi masyarakat tentang teknologi informasi',
                'tanggal_upload' => '2023-10-17',
                'status' => 'aktif',
                'kategori' => 'Edukasi',
                'jenis_media' => 'foto',
                'url_media' => 'https://placehold.co/600x400/2ecc71/ffffff?text=Edukasi+Masyarakat',
                'created_at' => '2023-10-17 11:15:00',
                'updated_at' => '2023-10-17 11:15:00'
            ]
        ];

        return Inertia::render('admin/foto-video/index', [
            'fotovideo' => $fotovideo
        ]);
    }
}