<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InputDataVariabelController extends Controller
{
    public function index(): Response
    {
        // Dummy data for input data variabel management
        $dataVariabels = [
            [
                'id' => 1,
                'judul' => 'Variabel Cuaca Bulanan',
                'deskripsi' => 'Data variabel cuaca bulanan termasuk suhu, kelembaban, dan curah hujan',
                'satuan' => 'Celsius, %, mm',
                'tipe_data' => 'numeric',
                'kategori' => 'Cuaca',
                'tahun_data' => 2023,
                'status' => 'aktif',
                'created_at' => '2023-01-15 10:30:00',
                'updated_at' => '2023-01-15 10:30:00'
            ],
            [
                'id' => 2,
                'judul' => 'Variabel Produksi Pangan',
                'deskripsi' => 'Data variabel produksi pangan tahunan berdasarkan jenis komoditas',
                'satuan' => 'Ton',
                'tipe_data' => 'numeric',
                'kategori' => 'Pertanian',
                'tahun_data' => 2023,
                'status' => 'aktif',
                'created_at' => '2023-02-20 14:20:00',
                'updated_at' => '2023-02-20 14:20:00'
            ],
            [
                'id' => 3,
                'judul' => 'Variabel Indeks Pembangunan Manusia',
                'deskripsi' => 'Data variabel untuk menghitung indeks pembangunan manusia',
                'satuan' => 'Skor',
                'tipe_data' => 'numeric',
                'kategori' => 'Sosial',
                'tahun_data' => 2023,
                'status' => 'aktif',
                'created_at' => '2023-03-10 09:45:00',
                'updated_at' => '2023-03-10 09:45:00'
            ],
            [
                'id' => 4,
                'judul' => 'Variabel Ketersediaan Air Bersih',
                'deskripsi' => 'Data variabel ketersediaan air bersih per kapita',
                'satuan' => 'Liter/hari',
                'tipe_data' => 'numeric',
                'kategori' => 'Lingkungan',
                'tahun_data' => 2023,
                'status' => 'non-aktif',
                'created_at' => '2023-04-05 11:15:00',
                'updated_at' => '2023-04-05 11:15:00'
            ],
            [
                'id' => 5,
                'judul' => 'Variabel Mobilitas Penduduk',
                'deskripsi' => 'Data variabel pergerakan penduduk antar wilayah',
                'satuan' => 'Jumlah',
                'tipe_data' => 'numeric',
                'kategori' => 'Demografi',
                'tahun_data' => 2023,
                'status' => 'aktif',
                'created_at' => '2023-05-12 13:30:00',
                'updated_at' => '2023-05-12 13:30:00'
            ]
        ];

        return Inertia::render('admin/data/input-data-variabel', [
            'dataVariabels' => $dataVariabels
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'satuan' => 'required|string',
            'tipe_data' => 'required|in:numeric,text,boolean,date',
            'kategori' => 'required|string',
            'tahun_data' => 'required|integer|min:1900|max:2100',
            'status' => 'required|in:aktif,non-aktif',
        ]);

        session()->flash('success', 'Data variabel berhasil ditambahkan.');
        return Inertia::location(route('admin-data-input-variabel'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'sometimes|required|string',
            'deskripsi' => 'sometimes|required|string',
            'satuan' => 'sometimes|required|string',
            'tipe_data' => 'in:numeric,text,boolean,date',
            'kategori' => 'sometimes|required|string',
            'tahun_data' => 'sometimes|required|integer|min:1900|max:2100',
            'status' => 'sometimes|required|in:aktif,non-aktif',
        ]);

        session()->flash('success', 'Data variabel berhasil diperbarui.');
        return Inertia::location(route('admin-data-input-variabel'));
    }

    public function destroy($id)
    {
        session()->flash('success', 'Data variabel berhasil dihapus.');
        return Inertia::location(route('admin-data-input-variabel'));
    }
}