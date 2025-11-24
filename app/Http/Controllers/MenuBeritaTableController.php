<?php

namespace App\Http\Controllers;

use App\Models\MenuBeritaTable;
use App\Models\ProdusenDataTable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MenuBeritaTableController extends Controller
{
    protected $rootPathFile = 'berita';
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
            'file' => 'required|file',
            'foto' => 'required|file',
            'status' => 'required|boolean',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
        ]);

        $file_path = '';
        $foto_path = '';
        // $file_size = null;

        // Jika ada file → upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $file->storePubliclyAs(
                $this->rootPathFile,
                $file->getClientOriginalName(),
                'public'
            );

            $file_path = $file->getClientOriginalName();
            // $file_size = $file->getSize();
        }

        // Jika ada foto → upload
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');

            $foto->storePubliclyAs(
                $this->rootPathFile,
                $foto->getClientOriginalName(),
                'public'
            );

            $foto_path = $foto->getClientOriginalName();
        }

        MenuBeritaTable::create([
            'judul' => $request->judul,
            'tanggal_rilis' => $request->tanggal_rilis,
            'isi_singkat' => $request->isi_singkat,
            'isi' => $request->isi,
            'file' => $file_path,
            'foto' => $foto_path,
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
            'file' => 'nullable|file',
            'foto' => 'nullable|file',
            'status' => 'required|boolean',
            'produsen_data_table_id' => 'sometimes|required|integer|exists:produsen_data_tables,id',
        ]);

        $data = $request->except(['file', 'foto', 'user_id']);

        // Jika ada file baru → upload, hapus file lama
        if ($request->hasFile('file')) {
            if ($menuBeritaTable->file) {
                Storage::disk('public')->delete($this->rootPathFile . '/' . $menuBeritaTable->file);
            }

            $file = $request->file('file');
            $file->storePubliclyAs($this->rootPathFile, $file->getClientOriginalName(), 'public');

            $data['file'] = $file->getClientOriginalName();
        }

        // Jika ada foto baru → upload, hapus foto lama
        if ($request->hasFile('foto')) {
            if ($menuBeritaTable->foto) {
                Storage::disk('public')->delete($this->rootPathFile . '/' . $menuBeritaTable->foto);
            }

            $foto = $request->file('foto');
            $foto->storePubliclyAs($this->rootPathFile, $foto->getClientOriginalName(), 'public');

            $data['foto'] = $foto->getClientOriginalName();
        }

        $menuBeritaTable->update($data);

        session()->flash('success', 'Berita berhasil diperbarui.');
        return Inertia::location(route('admin-berita'));
    }

    public function destroy(MenuBeritaTable $menuBeritaTable)
    {
        // Hapus file dan foto jika ada
        if ($menuBeritaTable->file) {
            Storage::disk('public')->delete($this->rootPathFile . '/' . $menuBeritaTable->file);
        }

        if ($menuBeritaTable->foto) {
            Storage::disk('public')->delete($this->rootPathFile . '/' . $menuBeritaTable->foto);
        }

        $menuBeritaTable->delete();

        session()->flash('success', 'Berita berhasil dihapus.');
        return Inertia::location(route('admin-berita'));
    }

    public function download(Request $request)
    {
        $request->validate([
            'link' => 'required|string',
        ]);

        return Storage::disk('public')->download($this->rootPathFile . '/' . $request['link']);
    }
}