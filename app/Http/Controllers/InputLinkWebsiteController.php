<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InputLinkWebsiteController extends Controller
{
    public function index(): Response
    {
        // Dummy data for input link website management
        $linkWebsites = [
            [
                'id' => 1,
                'judul' => 'Sistem Informasi Statistik',
                'url' => 'https://stats.example.com',
                'deskripsi' => 'Platform untuk mengakses data statistik resmi',
                'kategori' => 'Statistik',
                'status' => 'aktif',
                'created_at' => '2023-01-15 10:30:00',
                'updated_at' => '2023-01-15 10:30:00'
            ],
            [
                'id' => 2,
                'judul' => 'Peta Geospasial Interaktif',
                'url' => 'https://geospasial.example.com',
                'deskripsi' => 'Platform untuk tampilan dan analisis data geospasial',
                'kategori' => 'Geospasial',
                'status' => 'aktif',
                'created_at' => '2023-02-20 14:20:00',
                'updated_at' => '2023-02-20 14:20:00'
            ],
            [
                'id' => 3,
                'judul' => 'Dashboard Indikator Pembangunan',
                'url' => 'https://indikator.example.com',
                'deskripsi' => 'Dashboard real-time untuk monitoring indikator pembangunan',
                'kategori' => 'Monitoring',
                'status' => 'aktif',
                'created_at' => '2023-03-10 09:45:00',
                'updated_at' => '2023-03-10 09:45:00'
            ],
            [
                'id' => 4,
                'judul' => 'Repository Data Variabel',
                'url' => 'https://variabel.example.com',
                'deskripsi' => 'Katalog lengkap data variabel yang tersedia',
                'kategori' => 'Data',
                'status' => 'non-aktif',
                'created_at' => '2023-04-05 11:15:00',
                'updated_at' => '2023-04-05 11:15:00'
            ],
            [
                'id' => 5,
                'judul' => 'Portal Berita Resmi',
                'url' => 'https://berita.example.com',
                'deskripsi' => 'Portal berita dan informasi resmi dari pemerintah',
                'kategori' => 'Berita',
                'status' => 'aktif',
                'created_at' => '2023-05-12 13:30:00',
                'updated_at' => '2023-05-12 13:30:00'
            ]
        ];

        return Inertia::render('admin/data/input-link-website', [
            'linkWebsites' => $linkWebsites
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'url' => 'required|url',
            'deskripsi' => 'required|string',
            'kategori' => 'required|string',
            'status' => 'required|in:aktif,non-aktif',
        ]);

        session()->flash('success', 'Link website berhasil ditambahkan.');
        return Inertia::location(route('admin-data-input-link'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'sometimes|required|string',
            'url' => 'sometimes|required|url',
            'deskripsi' => 'sometimes|required|string',
            'kategori' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:aktif,non-aktif',
        ]);

        session()->flash('success', 'Link website berhasil diperbarui.');
        return Inertia::location(route('admin-data-input-link'));
    }

    public function destroy($id)
    {
        session()->flash('success', 'Link website berhasil dihapus.');
        return Inertia::location(route('admin-data-input-link'));
    }
}