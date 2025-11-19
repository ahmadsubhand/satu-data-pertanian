<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InputDataController extends Controller
{
    public function index(): Response
    {
        // Dummy data for input data management
        $dataItems = [
            [
                'id' => 1,
                'judul' => 'Statistik Produksi Pertanian 2023',
                'tgl_rilis' => '2023-12-15',
                'abstraksi' => 'Data statistik produksi pertanian tahun 2023',
                'produsen_data' => 'Pusdatin',
                'tagging_data' => ['produksi', 'statistik', '2023'],
                'data_prioritas' => true,
                'kategori_data' => 'Statistik',
                'progres' => 90,
                'status' => 'published',
                'catatan' => 'Sudah diverifikasi',
                'file' => 'produksi_2023.pdf',
                'created_at' => '2023-12-10 09:30:00',
                'updated_at' => '2023-12-15 09:30:00'
            ],
            [
                'id' => 2,
                'judul' => 'Data Geospasial Irigasi',
                'tgl_rilis' => '2023-11-20',
                'abstraksi' => 'Peta geospasial sistem irigasi di Indonesia',
                'produsen_data' => 'Badan Geospasial',
                'tagging_data' => ['geospasial', 'irigasi', 'peta'],
                'data_prioritas' => false,
                'kategori_data' => 'Geospasial',
                'progres' => 75,
                'status' => 'review',
                'catatan' => 'Butuh revisi',
                'file' => 'irigasi.geojson',
                'created_at' => '2023-11-15 14:45:00',
                'updated_at' => '2023-11-20 14:45:00'
            ],
            [
                'id' => 3,
                'judul' => 'Indikator Harga Komoditas',
                'tgl_rilis' => '2023-10-05',
                'abstraksi' => 'Data indikator harga komoditas pertanian',
                'produsen_data' => 'Pusdatin',
                'tagging_data' => ['harga', 'komoditas', 'indikator'],
                'data_prioritas' => true,
                'kategori_data' => 'Indikator',
                'progres' => 100,
                'status' => 'published',
                'catatan' => 'Selesai',
                'file' => 'harga_komoditas.xlsx',
                'created_at' => '2023-10-01 08:20:00',
                'updated_at' => '2023-10-05 08:20:00'
            ],
            [
                'id' => 4,
                'judul' => 'Data Variabel Cuaca',
                'tgl_rilis' => '2023-09-12',
                'abstraksi' => 'Data variabel cuaca dan iklim',
                'produsen_data' => 'BMKG',
                'tagging_data' => ['cuaca', 'iklim', 'variabel'],
                'data_prioritas' => false,
                'kategori_data' => 'Variabel',
                'progres' => 60,
                'status' => 'draft',
                'catatan' => 'Dalam pengumpulan',
                'file' => 'cuaca.csv',
                'created_at' => '2023-09-05 11:30:00',
                'updated_at' => '2023-09-12 11:30:00'
            ],
            [
                'id' => 5,
                'judul' => 'Dataset Link Terkait',
                'tgl_rilis' => '2023-08-30',
                'abstraksi' => 'Kumpulan link website terkait data pertanian',
                'produsen_data' => 'Pusdatin',
                'tagging_data' => ['link', 'website', 'referensi'],
                'data_prioritas' => false,
                'kategori_data' => 'Link',
                'progres' => 45,
                'status' => 'draft',
                'catatan' => 'Perlu dilengkapi',
                'file' => 'links.json',
                'created_at' => '2023-08-25 13:15:00',
                'updated_at' => '2023-08-30 13:15:00'
            ]
        ];

        return Inertia::render('admin/data/input-data', [
            'dataItems' => $dataItems
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'tgl_rilis' => 'required|date',
            'abstraksi' => 'required|string',
            'produsen_data' => 'required|string',
            'tagging_data' => 'nullable|string',
            'data_prioritas' => 'boolean',
            'kategori_data' => 'required|string',
            'progres' => 'required|integer|min:0|max:100',
            'status' => 'required|in:draft,review,published,rejected',
            'catatan' => 'nullable|string',
            'file' => 'required|string',
        ]);

        session()->flash('success', 'Data berhasil ditambahkan.');
        return Inertia::location(route('admin-data-input'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'sometimes|required|string',
            'tgl_rilis' => 'sometimes|required|date',
            'abstraksi' => 'sometimes|required|string',
            'produsen_data' => 'sometimes|required|string',
            'tagging_data' => 'nullable|string',
            'data_prioritas' => 'boolean',
            'kategori_data' => 'sometimes|required|string',
            'progres' => 'sometimes|required|integer|min:0|max:100',
            'status' => 'sometimes|required|in:draft,review,published,rejected',
            'catatan' => 'nullable|string',
            'file' => 'sometimes|required|string',
        ]);

        session()->flash('success', 'Data berhasil diperbarui.');
        return Inertia::location(route('admin-data-input'));
    }

    public function destroy($id)
    {
        session()->flash('success', 'Data berhasil dihapus.');
        return Inertia::location(route('admin-data-input'));
    }
}