<?php

namespace App\Http\Controllers;

use App\Models\MenuMetadataTable;
use App\Models\ProdusenDataTable;
use App\Models\KategoriDataTable;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InputDataController extends Controller
{
    public function index(): Response
    {
        $dataItems = MenuMetadataTable::with(['user', 'produsenDataTable', 'kategoriDataTable'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'tgl_rilis' => $item->tanggal_rilis,
                    'abstraksi' => $item->abstraksi,
                    'produsen_data' => $item->produsenDataTable->value ?? 'Tidak Diketahui',
                    'produsen_data_table_id' => $item->produsen_data_table_id,
                    'data_prioritas' => $item->is_data_prioritas,
                    'kategori_data' => $item->kategoriDataTable->value ?? 'Tidak Diketahui',
                    'kategori_data_table_id' => $item->kategori_data_table_id,
                    'link_meta' => $item->link_meta,
                    'file_meta1' => $item->file_meta1,
                    'file_meta2' => $item->file_meta2,
                    'file_meta3' => $item->file_meta3,
                    'ukuran_file' => $item->ukuran_file,
                    'file_statistik' => $item->file_statistik,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ];
            });

        $produsenData = ProdusenDataTable::get();
        $kategoriData = KategoriDataTable::get();
        $users = User::get();

        return Inertia::render('admin/data/input-data', [
            'dataItems' => $dataItems,
            'produsenData' => $produsenData,
            'kategoriData' => $kategoriData,
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal_rilis' => 'required|date',
            'abstraksi' => 'required|string',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
            'is_data_prioritas' => 'boolean',
            'kategori_data_table_id' => 'required|integer|exists:kategori_data_tables,id',
            'link_meta' => 'nullable|string|max:255',
            'file_meta1' => 'nullable|string|max:255',
            'file_meta2' => 'nullable|string|max:255',
            'file_meta3' => 'nullable|string|max:255',
            'ukuran_file' => 'required|integer',
            'file_statistik' => 'nullable|string|max:255',
        ]);

        MenuMetadataTable::create([
            'judul' => $request->judul,
            'tanggal_rilis' => $request->tanggal_rilis,
            'abstraksi' => $request->abstraksi,
            'produsen_data_table_id' => $request->produsen_data_table_id,
            'is_data_prioritas' => $request->is_data_prioritas ?? false,
            'kategori_data_table_id' => $request->kategori_data_table_id,
            'link_meta' => $request->link_meta ?? '',
            'file_meta1' => $request->file_meta1 ?? '',
            'file_meta2' => $request->file_meta2 ?? '',
            'file_meta3' => $request->file_meta3 ?? '',
            'ukuran_file' => $request->ukuran_file,
            'file_statistik' => $request->file_statistik ?? '',
            'user_id' => auth()->id() // Assuming the current user is the creator
        ]);

        session()->flash('success', 'Data berhasil ditambahkan.');
        return Inertia::location(route('admin-data-input'));
    }

    public function update(Request $request, MenuMetadataTable $menuMetadataTable)
    {
        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'tanggal_rilis' => 'sometimes|required|date',
            'abstraksi' => 'sometimes|required|string',
            'produsen_data_table_id' => 'sometimes|required|integer|exists:produsen_data_tables,id',
            'is_data_prioritas' => 'boolean',
            'kategori_data_table_id' => 'sometimes|required|integer|exists:kategori_data_tables,id',
            'link_meta' => 'nullable|string|max:255',
            'file_meta1' => 'nullable|string|max:255',
            'file_meta2' => 'nullable|string|max:255',
            'file_meta3' => 'nullable|string|max:255',
            'ukuran_file' => 'sometimes|required|integer',
            'file_statistik' => 'nullable|string|max:255',
        ]);

        $menuMetadataTable->update($request->except(['user_id'])); // Don't allow updating user_id

        session()->flash('success', 'Data berhasil diperbarui.');
        return Inertia::location(route('admin-data-input'));
    }

    public function destroy(MenuMetadataTable $menuMetadataTable)
    {
        $menuMetadataTable->delete();

        session()->flash('success', 'Data berhasil dihapus.');
        return Inertia::location(route('admin-data-input'));
    }
}