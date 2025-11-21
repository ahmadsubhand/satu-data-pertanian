<?php

namespace App\Http\Controllers;

use App\Models\MenuPublikasiTable;
use App\Models\ProdusenDataTable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MenuPublikasiTableController extends Controller
{
    protected $rootPathFile = 'publikasi';

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
            'keterangan' => 'required|string',
            'nomor_publikasi' => 'nullable|string|max:255',
            'nomor_issn' => 'nullable|string|max:255',
            'file' => 'required|file',
            'cover' => 'required|file',
            'status' => 'required|boolean',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
            'jumlah_halaman' => 'required|integer',
            'abstraksi' => 'required|string',
        ]);

        $file_path = '';
        $cover_path = '';
        $fileSize = null;

        // Jika ada file → upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $file->storePubliclyAs(
                $this->rootPathFile,
                $file->getClientOriginalName(),
                'public'
            );

            $file_path = $file->getClientOriginalName();
            $fileSize = $file->getSize();
        }

        // Jika ada cover → upload
        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');

            $cover->storePubliclyAs(
                $this->rootPathFile,
                $cover->getClientOriginalName(),
                'public'
            );

            $cover_path = $cover->getClientOriginalName();
        }

        MenuPublikasiTable::create([
            'judul' => $request->judul,
            'tanggal_rilis' => $request->tanggal_rilis,
            'keterangan' => $request->keterangan,
            'nomor_publikasi' => $request->nomor_publikasi ?? '',
            'nomor_issn' => $request->nomor_issn ?? '',
            'file' => $file_path,
            'cover' => $cover_path,
            'status' => $request->status,
            'produsen_data_table_id' => $request->produsen_data_table_id,
            'ukuran_file' => $fileSize,
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
            'keterangan' => 'required|string',
            'nomor_publikasi' => 'nullable|string|max:255',
            'nomor_issn' => 'nullable|string|max:255',
            'file' => 'nullable|file',
            'cover' => 'nullable|file',
            'status' => 'required|boolean',
            'produsen_data_table_id' => 'sometimes|required|integer|exists:produsen_data_tables,id',
            'jumlah_halaman' => 'required|integer',
            'abstraksi' => 'required|string',
        ]);

        $data = $request->except(['file', 'cover', 'user_id']);

        // Jika ada file baru → upload, hapus file lama
        if ($request->hasFile('file')) {
            if ($menuPublikasiTable->file) {
                Storage::disk('public')->delete($this->rootPathFile . '/' . $menuPublikasiTable->file);
            }

            $file = $request->file('file');
            $file->storePubliclyAs($this->rootPathFile, $file->getClientOriginalName(), 'public');

            $data['file'] = $file->getClientOriginalName();
            $data['ukuran_file'] = $file->getSize();
        }

        // Jika ada cover baru → upload, hapus cover lama
        if ($request->hasFile('cover')) {
            if ($menuPublikasiTable->cover) {
                Storage::disk('public')->delete($this->rootPathFile . '/' . $menuPublikasiTable->cover);
            }

            $cover = $request->file('cover');
            $cover->storePubliclyAs($this->rootPathFile, $cover->getClientOriginalName(), 'public');

            $data['cover'] = $cover->getClientOriginalName();
        }

        $menuPublikasiTable->update($data);

        session()->flash('success', 'Publikasi berhasil diperbarui.');
        return Inertia::location(route('admin-publikasi'));
    }

    public function destroy(MenuPublikasiTable $menuPublikasiTable)
    {
        // Hapus file dan cover jika ada
        if ($menuPublikasiTable->file) {
            Storage::disk('public')->delete($this->rootPathFile . '/' . $menuPublikasiTable->file);
        }

        if ($menuPublikasiTable->cover) {
            Storage::disk('public')->delete($this->rootPathFile . '/' . $menuPublikasiTable->cover);
        }

        $menuPublikasiTable->delete();

        session()->flash('success', 'Publikasi berhasil dihapus.');
        return Inertia::location(route('admin-publikasi'));
    }

    public function download(Request $request)
    {
        $request->validate([
            'link' => 'required|string',
        ]);

        return Storage::disk('public')->download($this->rootPathFile . '/' . $request['link']);
    }
}