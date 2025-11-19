<?php

namespace App\Http\Controllers;

use App\Models\MenuPublikasiTable;
use App\Models\ProdusenDataTable;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuPublikasiTableController extends Controller
{
    public function index(): Response
    {
        $publikasi = MenuPublikasiTable::with(['user', 'produsenDataTable'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'tanggal_rilis' => $item->tanggal_rilis,
                    'keterangan' => $item->keterangan,
                    'nomor_publikasi' => $item->nomor_publikasi,
                    'nomor_issn' => $item->nomor_issn,
                    'file' => $item->file,
                    'cover' => $item->cover,
                    'status' => $item->status,
                    'produsen_data_table_id' => $item->produsen_data_table_id,
                    'produsen_data' => $item->produsenDataTable->value ?? 'Tidak Diketahui',
                    'ukuran_file' => $item->ukuran_file,
                    'jumlah_halaman' => $item->jumlah_halaman,
                    'abstraksi' => $item->abstraksi,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ];
            });

        $produsenData = ProdusenDataTable::get();

        return Inertia::render('admin/publikasi/index', [
            'publikasi' => $publikasi,
            'produsenData' => $produsenData
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal_rilis' => 'required|date',
            'keterangan' => 'nullable|string',
            'nomor_publikasi' => 'nullable|string|max:255',
            'nomor_issn' => 'nullable|string|max:255',
            'file' => 'required|string|max:255',
            'cover' => 'required|string|max:255',
            'status' => 'required|boolean',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
            'ukuran_file' => 'required|integer',
            'jumlah_halaman' => 'required|integer',
            'abstraksi' => 'required|string',
        ]);

        MenuPublikasiTable::create([
            'judul' => $request->judul,
            'tanggal_rilis' => $request->tanggal_rilis,
            'keterangan' => $request->keterangan,
            'nomor_publikasi' => $request->nomor_publikasi ?? '',
            'nomor_issn' => $request->nomor_issn ?? '',
            'file' => $request->file,
            'cover' => $request->cover,
            'status' => $request->status,
            'produsen_data_table_id' => $request->produsen_data_table_id,
            'ukuran_file' => $request->ukuran_file,
            'jumlah_halaman' => $request->jumlah_halaman,
            'abstraksi' => $request->abstraksi,
            'user_id' => auth()->id() // Assuming the current user is the creator
        ]);

        session()->flash('success', 'Publikasi berhasil ditambahkan.');
        return Inertia::location(route('admin-publikasi'));
    }

    public function update(Request $request, MenuPublikasiTable $menuPublikasiTable)
    {
        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'tanggal_rilis' => 'sometimes|required|date',
            'keterangan' => 'nullable|string',
            'nomor_publikasi' => 'nullable|string|max:255',
            'nomor_issn' => 'nullable|string|max:255',
            'file' => 'required|string|max:255',
            'cover' => 'required|string|max:255',
            'status' => 'required|boolean',
            'produsen_data_table_id' => 'sometimes|required|integer|exists:produsen_data_tables,id',
            'ukuran_file' => 'required|integer',
            'jumlah_halaman' => 'required|integer',
            'abstraksi' => 'required|string',
        ]);

        $menuPublikasiTable->update($request->except(['user_id'])); // Don't allow updating user_id

        session()->flash('success', 'Publikasi berhasil diperbarui.');
        return Inertia::location(route('admin-publikasi'));
    }

    public function destroy(MenuPublikasiTable $menuPublikasiTable)
    {
        $menuPublikasiTable->delete();

        session()->flash('success', 'Publikasi berhasil dihapus.');
        return Inertia::location(route('admin-publikasi'));
    }
}