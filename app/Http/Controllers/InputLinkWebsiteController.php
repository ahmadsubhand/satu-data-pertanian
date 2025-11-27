<?php

namespace App\Http\Controllers;

use App\Models\MenuLinkTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InputLinkWebsiteController extends Controller
{
    protected $rootPathFile = 'link';
    
    public function index(): Response
    {
        $links = MenuLinkTable::with(['user'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama' => $item->nama,
                    'link' => $item->link,
                    'status' => $item->status,
                    'foto' => $item->foto,
                    'user_id' => $item->user_id,
                    'user_nama' => $item->user->nama_lengkap ?? 'Tidak Diketahui',
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ];
            });

        return Inertia::render('admin/data/input-link-website', [
            'links' => $links,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'link' => 'required|url',
            'status' => 'required|boolean',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle image upload
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');

            $foto->storePubliclyAs(
                $this->rootPathFile,
                $foto->getClientOriginalName(),
                'public'
            );

            $fotoPath = $foto->getClientOriginalName();
        }

        MenuLinkTable::create([
            'nama' => $request->nama,
            'link' => $request->link,
            'status' => $request->status,
            'foto' => $fotoPath,
            'user_id' => auth()->id(),
        ]);

        session()->flash('success', 'Link berhasil ditambahkan.');
        return Inertia::location(route('admin-data-input-link'));
    }

    public function update(Request $request, MenuLinkTable $menuLinkTable)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'link' => 'required|url',
            'status' => 'required|boolean',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle image upload
        $fotoPath = $menuLinkTable->foto;
        if ($request->hasFile('foto')) {
            // Delete old file if exists
            if ($fotoPath) {
                Storage::disk('public')->delete($this->rootPathFile . '/' . $fotoPath);
            }

            $file = $request->file('foto');
            $file->storePubliclyAs($this->rootPathFile, $file->getClientOriginalName(), 'public');

            $fotoPath = $file->getClientOriginalName();
        }

        $menuLinkTable->update([
            'link' => $request->link,
            'nama' => $request->nama,
            'status' => $request->status,
            'foto' => $fotoPath,
        ]);

        session()->flash('success', 'Link berhasil diperbarui.');
        return Inertia::location(route('admin-data-input-link'));
    }

    public function destroy(MenuLinkTable $menuLinkTable)
    {
        // Delete the photo file if exists
        if ($menuLinkTable->foto) {
            Storage::disk('public')->delete($this->rootPathFile . '/' . $menuLinkTable->foto);
        }

        $menuLinkTable->delete();

        session()->flash('success', 'Link berhasil dihapus.');
        return Inertia::location(route('admin-data-input-link'));
    }

    public function download(Request $request)
    {
        $request->validate([
            'link' => 'required|string',
        ]);

        return Storage::disk('public')->download($this->rootPathFile . '/' . $request['link']);
    }
}