<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InputDataIndikatorController extends Controller
{
    public function index(): Response
    {
        // Dummy data for input data indikator management
        $dataIndikators = [
            [
                'id' => 1,
                'judul' => 'Indeks Pembangunan Manusia',
                'deskripsi' => 'Indikator pengukuran kesejahteraan masyarakat berdasarkan pendidikan, kesehatan, dan pendapatan',
                'rumus_perhitungan' => '(Harapan Hidup + Harapan Pendidikan + Rata-rata Lama Sekolah + Pendapatan) / 4',
                'kategori' => 'Sosial',
                'tahun_penerapan' => 2023,
                'status' => 'aktif',
                'created_at' => '2023-01-15 10:30:00',
                'updated_at' => '2023-01-15 10:30:00'
            ],
            [
                'id' => 2,
                'judul' => 'Indeks Kepuasan Masyarakat',
                'deskripsi' => 'Indikator pengukuran kepuasan layanan publik terhadap masyarakat',
                'rumus_perhitungan' => 'Jumlah responden puas / Total responden * 100',
                'kategori' => 'Pelayanan Publik',
                'tahun_penerapan' => 2023,
                'status' => 'aktif',
                'created_at' => '2023-02-20 14:20:00',
                'updated_at' => '2023-02-20 14:20:00'
            ],
            [
                'id' => 3,
                'judul' => 'Indeks Pembangunan Ekonomi',
                'deskripsi' => 'Indikator pengukuran pertumbuhan dan kesehatan ekonomi',
                'rumus_perhitungan' => '(PDRB + Investasi + Lapangan Kerja + Daya Beli) / 4',
                'kategori' => 'Ekonomi',
                'tahun_penerapan' => 2023,
                'status' => 'aktif',
                'created_at' => '2023-03-10 09:45:00',
                'updated_at' => '2023-03-10 09:45:00'
            ],
            [
                'id' => 4,
                'judul' => 'Indeks Kualitas Udara',
                'deskripsi' => 'Indikator pengukuran kualitas udara berdasarkan partikulat dan gas berbahaya',
                'rumus_perhitungan' => 'Rata-rata konsentrasi partikulat dan gas berbahaya',
                'kategori' => 'Lingkungan',
                'tahun_penerapan' => 2023,
                'status' => 'non-aktif',
                'created_at' => '2023-04-05 11:15:00',
                'updated_at' => '2023-04-05 11:15:00'
            ],
            [
                'id' => 5,
                'judul' => 'Indeks Ketahanan Pangan',
                'deskripsi' => 'Indikator pengukuran aksesibilitas, ketersediaan, dan stabilitas pangan',
                'rumus_perhitungan' => '(Akses + Ketersediaan + Stabilitas) / 3',
                'kategori' => 'Pangan',
                'tahun_penerapan' => 2023,
                'status' => 'aktif',
                'created_at' => '2023-05-12 13:30:00',
                'updated_at' => '2023-05-12 13:30:00'
            ]
        ];

        return Inertia::render('admin/data/input-data-indikator', [
            'dataIndikators' => $dataIndikators
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'rumus_perhitungan' => 'required|string',
            'kategori' => 'required|string',
            'tahun_penerapan' => 'required|integer|min:1900|max:2100',
            'status' => 'required|in:aktif,non-aktif',
        ]);

        session()->flash('success', 'Data indikator berhasil ditambahkan.');
        return Inertia::location(route('admin-data-input-indikator'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'sometimes|required|string',
            'deskripsi' => 'sometimes|required|string',
            'rumus_perhitungan' => 'sometimes|required|string',
            'kategori' => 'sometimes|required|string',
            'tahun_penerapan' => 'sometimes|required|integer|min:1900|max:2100',
            'status' => 'sometimes|required|in:aktif,non-aktif',
        ]);

        session()->flash('success', 'Data indikator berhasil diperbarui.');
        return Inertia::location(route('admin-data-input-indikator'));
    }

    public function destroy($id)
    {
        session()->flash('success', 'Data indikator berhasil dihapus.');
        return Inertia::location(route('admin-data-input-indikator'));
    }
}