<?php

namespace App\Http\Controllers;

use App\Models\MenuLinkTable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LinkController extends Controller
{
    public function index()
    {
        $links = MenuLinkTable::where('status', true)
            ->select(['id', 'nama', 'link', 'foto'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama' => $item->nama ?? 'Link Tanpa Nama',
                    'link' => $item->link,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                ];
            });

        return Inertia::render('Link', [
            'links' => $links
        ]);
    }
}