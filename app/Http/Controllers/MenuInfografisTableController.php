<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\MenuInfografisTable;
use App\Models\ProdusenDataTable;

class MenuInfografisTableController extends Controller
{
    public function index(): Response
    {
        $infografis = MenuInfografisTable::with(['user', 'produsenDataTable'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'tanggal_rilis' => $item->tanggal_rilis,
                    'keterangan' => $item->keterangan,
                    'file' => $item->file,
                    'status' => $item->status,
                    'produsen_data_table_id' => $item->produsen_data_table_id,
                    'produsen_data' => $item->produsenDataTable->value ?? 'Tidak Diketahui',
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ];
            });

        $produsenData = ProdusenDataTable::get();

        return Inertia::render('admin/infografis/index', [
            'infografis' => $infografis,
            'produsenData' => $produsenData
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal_rilis' => 'required|date',
            'keterangan' => 'required|string',
            'file' => 'required|string|max:255',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
            'status' => 'required|boolean',
        ]);

        MenuInfografisTable::create([
            'judul' => $request->judul,
            'tanggal_rilis' => $request->tanggal_rilis,
            'keterangan' => $request->keterangan,
            'file' => $request->file,
            'status' => $request->status,
            'produsen_data_table_id' => $request->produsen_data_table_id,
            'user_id' => auth()->id() // Assuming the current user is the creator
        ]);

        session()->flash('success', 'Infografis berhasil ditambahkan.');
        return Inertia::location(route('admin-infografis'));
    }

    public function update(Request $request, MenuInfografisTable $menuInfografisTable)
    {
        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'tanggal_rilis' => 'sometimes|required|date',
            'keterangan' => 'required|string',
            'file' => 'required|string|max:255',
            'produsen_data_table_id' => 'sometimes|required|integer|exists:produsen_data_tables,id',
            'status' => 'required|boolean',
        ]);
        $menuInfografisTable->update($request->except(['user_id'])); // Don't allow updating user_id

        session()->flash('success', 'Infografis berhasil diperbarui.');
        return Inertia::location(route('admin-infografis'));
    }

    public function destroy(MenuInfografisTable $menuInfografisTable)
    {
        $menuInfografisTable->delete();

        session()->flash('success', 'Infografis berhasil dihapus.');
        return Inertia::location(route('admin-infografis'));
    }
}