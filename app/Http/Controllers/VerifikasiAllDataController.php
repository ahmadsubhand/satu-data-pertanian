<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VerifikasiAllDataController extends Controller
{
    public function index(): Response
    {
        // Dummy data for verifikasi all data
        $verifikasiAllData = [
            [
                'id' => 1,
                'nama_dataset' => 'Data Kependudukan Wilayah Utara',
                'deskripsi' => 'Dataset lengkap tentang kependudukan di wilayah utara',
                'tanggal_pengajuan' => '2023-10-10',
                'status_verifikasi' => 'menunggu',
                'prioritas' => 'sedang',
                'kategori' => 'Kependudukan',
                'pihak_pengaju' => 'Dinas Kependudukan',
                'catatan' => 'Membutuhkan verifikasi dari tim validasi data',
                'created_at' => '2023-10-10 10:30:00',
                'updated_at' => '2023-10-10 10:30:00'
            ],
            [
                'id' => 2,
                'nama_dataset' => 'Data Kesehatan Masyarakat Kota',
                'deskripsi' => 'Dataset informasi kesehatan masyarakat kota',
                'tanggal_pengajuan' => '2023-10-12',
                'status_verifikasi' => 'diterima',
                'prioritas' => 'tinggi',
                'kategori' => 'Kesehatan',
                'pihak_pengaju' => 'Dinas Kesehatan',
                'catatan' => 'Sudah diverifikasi dan siap digunakan',
                'created_at' => '2023-10-12 15:45:00',
                'updated_at' => '2023-10-15 09:20:00'
            ],
            [
                'id' => 3,
                'nama_dataset' => 'Data Pendidikan Sekolah Dasar',
                'deskripsi' => 'Dataset tentang statistik pendidikan sekolah dasar',
                'tanggal_pengajuan' => '2023-10-14',
                'status_verifikasi' => 'ditolak',
                'prioritas' => 'rendah',
                'kategori' => 'Pendidikan',
                'pihak_pengaju' => 'Dinas Pendidikan',
                'catatan' => 'Perlu dilengkapi dengan dokumentasi pendukung',
                'created_at' => '2023-10-14 11:10:00',
                'updated_at' => '2023-10-16 14:30:00'
            ]
        ];

        return Inertia::render('admin/verifikasi-all-data/index', [
            'verifikasiAllData' => $verifikasiAllData
        ]);
    }
}