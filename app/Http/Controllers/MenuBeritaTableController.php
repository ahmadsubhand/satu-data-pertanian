<?php

namespace App\Http\Controllers;

use App\Models\MenuBeritaTable;
use App\Models\ProdusenDataTable;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuBeritaTableController extends Controller
{
    public function index(): Response
    {
        $berita = MenuBeritaTable::with(['user', 'produsenDataTable'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'tanggal_rilis' => $item->tanggal_rilis,
                    'isi_singkat' => $item->isi_singkat,
                    'isi' => $item->isi,
                    'file' => $item->file,
                    'foto' => $item->foto,
                    'status' => $item->status,
                    'produsen_data_table_id' => $item->produsen_data_table_id,
                    'produsen_data' => $item->produsenDataTable->value ?? 'Tidak Diketahui',
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ];
            });

        $produsenData = ProdusenDataTable::get();

        return Inertia::render('admin/berita/index', [
            'berita' => $berita,
            'produsenData' => $produsenData
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal_rilis' => 'required|date',
            'isi_singkat' => 'nullable|string',
            'isi' => 'required|string',
            'file' => 'nullable|string|max:255',
            'foto' => 'nullable|string|max:255',
            'status' => 'required|boolean',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
        ]);

        MenuBeritaTable::create([
            'judul' => $request->judul,
            'tanggal_rilis' => $request->tanggal_rilis,
            'isi_singkat' => $request->isi_singkat,
            'isi' => $request->isi,
            'file' => $request->file ?? '',
            'foto' => $request->foto ?? '',
            'status' => $request->status,
            'produsen_data_table_id' => $request->produsen_data_table_id,
            'user_id' => auth()->id() // Assuming the current user is the creator
        ]);

        session()->flash('success', 'Berita berhasil ditambahkan.');
        return Inertia::location(route('admin-berita'));
    }

    public function update(Request $request, MenuBeritaTable $menuBeritaTable)
    {
        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'tanggal_rilis' => 'sometimes|required|date',
            'isi_singkat' => 'nullable|string',
            'isi' => 'sometimes|required|string',
            'file' => 'nullable|string|max:255',
            'foto' => 'nullable|string|max:255',
            'status' => 'required|boolean',
            'produsen_data_table_id' => 'sometimes|required|integer|exists:produsen_data_tables,id',
        ]);

        $menuBeritaTable->update($request->except(['user_id'])); // Don't allow updating user_id

        session()->flash('success', 'Berita berhasil diperbarui.');
        return Inertia::location(route('admin-berita'));
    }

    public function destroy(MenuBeritaTable $menuBeritaTable)
    {
        $menuBeritaTable->delete();

        session()->flash('success', 'Berita berhasil dihapus.');
        return Inertia::location(route('admin-berita'));
    }
}