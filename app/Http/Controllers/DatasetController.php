<?php

namespace App\Http\Controllers;

use App\Models\MenuMetadataTable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DatasetController extends Controller
{
    public function index(): Response
    {
        $limit = 10; // Jumlah item per halaman

        $query = MenuMetadataTable::with(['user', 'produsenDataTable', 'kategoriDataTable'])
            ->select([
                'id',
                'judul',
                'tanggal_rilis',
                'abstraksi',
                'is_data_prioritas',
                'link_meta',
                'file_meta1',
                'file_meta2',
                'file_meta3',
                'ukuran_file',
                'file_statistik',
                'created_at',
                'updated_at'
            ]);

        // Cari berdasarkan judul atau abstraksi
        if (request()->has('search') && request('search') !== '') {
            $searchTerm = request('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('judul', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('abstraksi', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Filter berdasarkan is_data_prioritas
        if (request()->has('prioritas') && request('prioritas') !== '' && request('prioritas') !== null) {
            $prioritas = request('prioritas');
            $query->where('is_data_prioritas', $prioritas);
        }

        $datasets = $query->paginate($limit)->withQueryString();

        $transformedDatasets = collect($datasets->items())->map(function ($item) {
            return [
                'id' => $item->id,
                'judul' => $item->judul ?? 'Tanpa Judul',
                'tanggal_rilis' => $item->tanggal_rilis ? $item->tanggal_rilis->format('Y-m-d') : 'N/A',
                'keterangan' => $item->abstraksi ?? 'Deskripsi tidak tersedia',
                'nomor_publikasi' => $item->link_meta ?? null,
                'nomor_issn' => $item->file_meta1 ? substr(basename($item->file_meta1), 0, 15) : null,
                'file' => $item->file_statistik ? asset('storage/' . $item->file_statistik) : '#',
                'cover' => '/images/default-cover.png',
                'ukuran_file' => $item->ukuran_file ?? 0,
                'jumlah_halaman' => rand(20, 200),
                'abstraksi' => $item->abstraksi ?? '',
                'created_at' => $item->created_at ? $item->created_at->format('Y-m-d H:i:s') : 'N/A',
                'updated_at' => $item->updated_at ? $item->updated_at->format('Y-m-d H:i:s') : 'N/A',
                'is_data_prioritas' => $item->is_data_prioritas ?? false,
            ];
        })->toArray();

        return Inertia::render('Samples/DatasetPage', [
            'datasets' => $transformedDatasets, // Changed back to datasets to match the component prop
            'paginator' => [
                'current_page' => $datasets->currentPage(),
                'last_page' => $datasets->lastPage(),
                'per_page' => $datasets->perPage(),
                'total' => $datasets->total(),
                'from' => $datasets->firstItem(),
                'to' => $datasets->lastItem(),
                'links' => $datasets->getUrlRange(1, $datasets->lastPage()),
            ],
            'filters' => [
                'search' => request('search', ''),
                'prioritas' => request('prioritas', '')
            ]
        ]);
    }
}