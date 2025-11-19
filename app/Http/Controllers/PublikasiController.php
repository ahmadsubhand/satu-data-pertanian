<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublikasiController extends Controller
{
    public function index(): Response
    {
        // Dummy data for publikasi
        $publikasi = [
            [
                'id' => 1,
                'judul' => 'Laporan Tahunan Pembangunan 2023',
                'deskripsi' => 'Laporan lengkap mengenai proyek pembangunan yang telah selesai dan sedang berlangsung sepanjang tahun 2023',
                'tanggal_publikasi' => '2023-12-15',
                'status' => 'aktif',
                'kategori' => 'Laporan Tahunan',
                'url_file' => '/files/laporan-tahunan-2023.pdf',
                'created_at' => '2023-12-15 10:30:00',
                'updated_at' => '2023-12-15 10:30:00'
            ],
            [
                'id' => 2,
                'judul' => 'Kajian Dampak Lingkungan Proyek Jalan Tol',
                'deskripsi' => 'Analisis mendalam mengenai dampak lingkungan dari proyek pembangunan jalan tol tahap 2',
                'tanggal_publikasi' => '2023-11-20',
                'status' => 'aktif',
                'kategori' => 'Kajian Lingkungan',
                'url_file' => '/files/kajian-lingkungan-jalan-tol.pdf',
                'created_at' => '2023-11-20 14:45:00',
                'updated_at' => '2023-11-20 14:45:00'
            ],
            [
                'id' => 3,
                'judul' => 'Pedoman Implementasi Smart City',
                'deskripsi' => 'Dokumen pedoman untuk implementasi konsep smart city di wilayah perkotaan',
                'tanggal_publikasi' => '2023-10-05',
                'status' => 'aktif',
                'kategori' => 'Pedoman',
                'url_file' => '/files/pedoman-smart-city.pdf',
                'created_at' => '2023-10-05 09:15:00',
                'updated_at' => '2023-10-05 09:15:00'
            ]
        ];

        return Inertia::render('admin/publikasi/index', [
            'publikasi' => $publikasi
        ]);
    }
}