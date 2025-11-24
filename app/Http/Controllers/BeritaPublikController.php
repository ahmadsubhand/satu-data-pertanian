<?php

namespace App\Http\Controllers;

use App\Models\MenuBeritaTable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BeritaPublikController extends Controller
{
    public function index(): Response
    {
        // Ambil berita yang aktif (status = 1) dari database
        $berita = MenuBeritaTable::with(['user', 'produsenDataTable'])
            ->where('status', 1) // Hanya tampilkan berita yang sudah dipublish
            ->orderBy('tanggal_rilis', 'desc')
            ->select('id', 'judul', 'isi_singkat', 'isi', 'tanggal_rilis', 'foto', 'produsen_data_table_id', 'created_at', 'updated_at')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'isi_singkat' => $item->isi_singkat,
                    'isi' => $item->isi,
                    'tanggal_rilis' => $item->tanggal_rilis,
                    'foto' => $item->foto,
                    'produsen_data' => $item->produsenDataTable->value ?? 'Kementerian Pertanian',
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ];
            });

        return Inertia::render('BeritaPage', [
            'pageTitle' => 'Berita Pertanian',
            'description' => 'Informasi terkini seputar berita dan perkembangan di sektor pertanian Indonesia',
            'berita' => $berita
        ]);
    }
    
    public function show($id)
    {
        $berita = MenuBeritaTable::with(['user', 'produsenDataTable'])
            ->where('id', $id)
            ->where('status', 1)
            ->select('id', 'judul', 'isi_singkat', 'isi', 'tanggal_rilis', 'foto', 'produsen_data_table_id', 'created_at', 'updated_at')
            ->firstOrFail();

        $berita = [
            'id' => $berita->id,
            'judul' => $berita->judul,
            'isi_singkat' => $berita->isi_singkat,
            'isi' => $berita->isi,
            'tanggal_rilis' => $berita->tanggal_rilis,
            'foto' => $berita->foto,
            'produsen_data' => $berita->produsenDataTable->value ?? 'Kementerian Pertanian',
            'created_at' => $berita->created_at,
            'updated_at' => $berita->updated_at
        ];

        return Inertia::render('BeritaDetailPage', [
            'pageTitle' => $berita['judul'],
            'berita' => $berita
        ]);
    }
}