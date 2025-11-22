<?php

namespace App\Http\Controllers;

use App\Models\MenuMultimediaTable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FotoVideoController extends Controller
{
    protected $rootPathFile = 'multimedia';

    public function index(): Response
    {
        $fotovideo = MenuMultimediaTable::with(['user'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'keterangan' => $item->keterangan,
                    'link_video' => $item->link_video,
                    'tanggal_rilis' => $item->tanggal_rilis,
                    'status' => $item->status,
                    'file' => $item->file,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ];
            });

        $users = User::get();

        return Inertia::render('admin/foto-video/index', [
            'fotovideo' => $fotovideo,
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal_rilis' => 'required|date',
            'keterangan' => 'required|string',
            'link_video' => 'nullable|string',
            'tanggal_rilis' => 'required|date',
            'status' => 'required|boolean',
            'file' => 'required|file'
        ]);

        $filePath = '';

        // Check if it's a file upload (photo or video)
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            // Store the file
            $file->storePubliclyAs(
                $this->rootPathFile,
                $file->getClientOriginalName(),
                'public'
            );

            $filePath = $file->getClientOriginalName();
        }

        MenuMultimediaTable::create([
            'judul' => $request->judul,
            'tanggal_rilis' => $request->tanggal_rilis,
            'keterangan' => $request->keterangan,
            'link_video' => $request->link_video,
            'tanggal_rilis' => $request->tanggal_rilis,
            'status' => $request->status,
            'file' => $filePath,
            'user_id' => auth()->id(),
        ]);

        session()->flash('success', 'Media berhasil ditambahkan.');
        return Inertia::location(route('admin-foto-video'));
    }

    public function update(Request $request, MenuMultimediaTable $fotovideo)
    {
        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'tanggal_rilis' => 'sometimes|required|date',
            'keterangan' => 'sometimes|required|string',
            'link_video' => 'nullable|string',
            'tanggal_rilis' => 'sometimes|required|date',
            'status' => 'sometimes|required|boolean',
            'file' => 'nullable|file'
        ]);

        $data = $request->except(['file', 'user_id']);

        // Handle file upload if present
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($fotovideo->file) {
                Storage::disk('public')->delete($this->rootPathFile . '/' . $fotovideo->file);
            }

            $file = $request->file('file');
            $file->storePubliclyAs(
                $this->rootPathFile,
                $file->getClientOriginalName(),
                'public'
            );

            $data['file'] = $file->getClientOriginalName();
        }

        $fotovideo->update($data);

        session()->flash('success', 'Media berhasil diperbarui.');
        return Inertia::location(route('admin-foto-video'));
    }

    public function destroy(MenuMultimediaTable $fotovideo)
    {
        // Delete associated file if it exists
        if ($fotovideo->file) {
            Storage::disk('public')->delete($this->rootPathFile . '/' . $fotovideo->file);
        }

        $fotovideo->delete();

        session()->flash('success', 'Media berhasil dihapus.');
        return Inertia::location(route('admin-foto-video'));
    }

    public function download(Request $request)
    {
        $request->validate([
            'link' => 'required|string',
        ]);

        return Storage::disk('public')->download($this->rootPathFile . '/' . $request['link']);
    }
}