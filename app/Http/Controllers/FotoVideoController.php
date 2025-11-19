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
                'file_name' => 'jembatan_baru.jpg',
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
                'file_name' => 'pengarahan_infrastruktur.mp4',
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
                'file_name' => 'edukasi_masyarakat.jpg',
                'created_at' => '2023-10-17 11:15:00',
                'updated_at' => '2023-10-17 11:15:00'
            ]
        ];

        return Inertia::render('admin/foto-video/index', [
            'fotovideo' => $fotovideo
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'tanggal_upload' => 'required|date',
            'status' => 'required|string',
            'kategori' => 'required|string',
            'jenis_media' => 'required|in:foto,video',
            'url_media' => 'required|string',
            'file_name' => 'nullable|string',
        ]);

        session()->flash('success', 'Media berhasil ditambahkan.');
        return Inertia::location(route('admin-media'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'sometimes|required|string',
            'deskripsi' => 'sometimes|required|string',
            'tanggal_upload' => 'sometimes|required|date',
            'status' => 'sometimes|required|string',
            'kategori' => 'sometimes|required|string',
            'jenis_media' => 'sometimes|required|in:foto,video',
            'url_media' => 'sometimes|required|string',
            'file_name' => 'nullable|string',
        ]);

        session()->flash('success', 'Media berhasil diperbarui.');
        return Inertia::location(route('admin-media'));
    }

    public function destroy($id)
    {
        session()->flash('success', 'Media berhasil dihapus.');
        return Inertia::location(route('admin-media'));
    }
}