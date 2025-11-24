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
                'created_at'
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

        return Inertia::render('Samples/DatasetPage', [
            'datasets' => $datasets->items(),
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