<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\MenuInfografisTable;
use App\Models\ProdusenDataTable;

class MenuInfografisTableController extends Controller
{
    protected $rootPathFile = 'infografis';
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
            'file' => 'required|file',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
            'status' => 'required|boolean',
        ]);

        $file_path = '';
        $file_size = null;

        // Jika ada file → upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $file->storePubliclyAs(
                $this->rootPathFile,
                $file->getClientOriginalName(),
                'public'
            );

            $file_path = $file->getClientOriginalName();
            $file_size = $file->getSize();
        }

        MenuInfografisTable::create([
            'judul' => $request->judul,
            'tanggal_rilis' => $request->tanggal_rilis,
            'keterangan' => $request->keterangan,
            'file' => $file_path,
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
            'file' => 'nullable|file',
            'produsen_data_table_id' => 'sometimes|required|integer|exists:produsen_data_tables,id',
            'status' => 'required|boolean',
        ]);

        $data = $request->except(['file', 'user_id']);

        // Jika ada file baru → upload, hapus file lama
        if ($request->hasFile('file')) {
            if ($menuInfografisTable->file) {
                Storage::disk('public')->delete($this->rootPathFile . '/' . $menuInfografisTable->file);
            }

            $file = $request->file('file');
            $file->storePubliclyAs($this->rootPathFile, $file->getClientOriginalName(), 'public');

            $data['file'] = $file->getClientOriginalName();
        }

        $menuInfografisTable->update($data);

        session()->flash('success', 'Infografis berhasil diperbarui.');
        return Inertia::location(route('admin-infografis'));
    }

    public function destroy(MenuInfografisTable $menuInfografisTable)
    {
        // Hapus file jika ada
        if ($menuInfografisTable->file) {
            Storage::disk('public')->delete($this->rootPathFile . '/' . $menuInfografisTable->file);
        }

        $menuInfografisTable->delete();

        session()->flash('success', 'Infografis berhasil dihapus.');
        return Inertia::location(route('admin-infografis'));
    }

    public function download(Request $request)
    {
        $request->validate([
            'link' => 'required|string',
        ]);

        return Storage::disk('public')->download($this->rootPathFile . '/' . $request['link']);
    }
}