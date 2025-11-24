<?php

use App\Http\Controllers\DatasetController;
use App\Http\Controllers\PublikasiController;
use App\Helpers\MenuHelper;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Models\MenuMetadataTable;
use App\Models\MenuPublikasiTable;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    // Ambil semua publikasi untuk ditampilkan di beranda (akan diambil sebagian di frontend)
    $publikasi = MenuPublikasiTable::where('status', true)
        ->select([
            'id',
            'judul as judul_pub',
            'keterangan as ket_pub',
            'tanggal_rilis as tgl_pub',
            'created_at',
            'updated_at'
        ])
        ->orderBy('tanggal_rilis', 'desc')
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'judul_pub' => $item->judul_pub ?? 'Tanpa Judul',
                'ket_pub' => $item->ket_pub ?? 'Deskripsi tidak tersedia',
                'tgl_pub' => $item->tgl_pub ? \Carbon\Carbon::parse($item->tgl_pub)->format('Y-m-d') : null,
                'kategori' => 'Publikasi',
                'status_pub' => 'aktif'
            ];
        })
        ->toArray();

    // Hitung jumlah dataset
    $datasetsCount = DB::table('menu_metadata_tables')->count();

    return Inertia::render('Home', [
        'satudataPublications' => $publikasi,
        'datasetsCount' => $datasetsCount
    ]);
})->name('home');

// Main page routes that use the navbar with animations
Route::get('/dataset', function () {
    // Dummy data for the dataset page
    return Inertia::render('Index', [
        'dataCatalogs' => [
            'data' => [
                [
                    'id' => 1,
                    'title' => 'Dataset Contoh 1',
                    'description' => 'Deskripsi dataset contoh pertama',
                    'source_url' => '#',
                    'api_endpoint' => '#',
                    'category' => 'statistical',
                    'tags' => ['contoh', 'data'],
                    'update_frequency' => 'monthly',
                    'last_synced_at' => date('Y-m-d'),
                    'metadata' => [],
                    'is_active' => true
                ],
                [
                    'id' => 2,
                    'title' => 'Dataset Contoh 2',
                    'description' => 'Deskripsi dataset contoh kedua',
                    'source_url' => '#',
                    'api_endpoint' => '#',
                    'category' => 'geospatial',
                    'tags' => ['contoh', 'peta'],
                    'update_frequency' => 'weekly',
                    'last_synced_at' => date('Y-m-d'),
                    'metadata' => [],
                    'is_active' => true
                ]
            ],
            'links' => [],
            'meta' => [
                'current_page' => 1,
                'from' => 1,
                'last_page' => 1,
                'path' => '/',
                'per_page' => 10,
                'to' => 2,
                'total' => 2
            ]
        ],
        'filters' => [
            'limit' => 10,
            'page' => 1
        ]
    ]);
})->name('dataset.index');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about.index');

Route::get('/auth/login', function () {
    return Inertia::render('auth/Login');
})->name('auth.login');

Route::get('/publikasi', [PublikasiController::class, 'publicIndex'])->name('publikasi.index');

// Additional route for the sample publication page
Route::get('/samples/publication', [PublikasiController::class, 'publicIndex'])->name('samples.publication');

// Routes for variables and indicators pages that show development message
Route::get('/variables', function () {
    return Inertia::render('VariablesPage');
})->name('variables.index');

Route::get('/indicators', function () {
    return Inertia::render('IndicatorsPage');
})->name('indicators.index');

// Route for dataset page
Route::get('/dataset', [DatasetController::class, 'index'])->name('dataset.index');

// Routes for dataset variables and indicators pages that show development message
Route::get('/dataset/variables', function () {
    return Inertia::render('VariablesPage');
})->name('dataset.variables.index');

Route::get('/dataset/indicators', function () {
    return Inertia::render('IndicatorsPage');
})->name('dataset.indicators.index');

Route::get('/data/statistical', function () {
    return Inertia::render('StatisticalPage');
})->name('data.statistical');

Route::get('/data/geospatial', function () {
    return Inertia::render('GeospatialPage');
})->name('data.geospatial');

Route::get('/berita', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Berita Pertanian',
        'description' => 'Informasi terkini seputar berita dan perkembangan di sektor pertanian Indonesia',
        'category' => 'Berita'
    ]);
})->name('berita.index');

Route::get('/galeri', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Galeri Data',
        'description' => 'Koleksi visualisasi data dan peta terkait sektor pertanian',
        'category' => 'Visualisasi'
    ]);
})->name('galeri.index');

Route::get('/infografis', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Infografis',
        'description' => 'Informasi penting seputar pertanian dalam bentuk visual yang mudah dipahami',
        'category' => 'Infografis'
    ]);
})->name('infografis.index');

Route::get('/products/multimedia', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Multimedia',
        'description' => 'Konten multimedia terkait pertanian dalam berbagai format',
        'category' => 'Multimedia'
    ]);
})->name('products.multimedia');

Route::get('/release-plans', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Rencana Rilis',
        'description' => 'Jadwal dan rencana rilis data terbaru dari Kementerian Pertanian',
        'category' => 'Perencanaan'
    ]);
})->name('release-plans.index');

Route::get('/metadata', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Metadata',
        'description' => 'Informasi deskriptif tentang dataset yang tersedia di Satudata Pertanian',
        'category' => 'Metadata'
    ]);
})->name('metadata.index');

Route::get('/satudata', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Referensi Link',
        'description' => 'Kumpulan tautan penting terkait Satudata Pertanian dan program lainnya',
        'category' => 'Referensi'
    ]);
})->name('satudata.index');

Route::get('/regulation', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Regulasi',
        'description' => 'Peraturan dan regulasi terkait Satu Data Indonesia dan pengelolaan data pertanian',
        'category' => 'Regulasi'
    ]);
})->name('regulation.index');

Route::get('/data-principles', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Prinsip Satu Data',
        'description' => 'Prinsip-prinsip dasar dalam pelaksanaan Satu Data Indonesia di sektor pertanian',
        'category' => 'Prinsip Data'
    ]);
})->name('data-principles.index');

Route::get('/priority-data', function () {
    return Inertia::render('GenericPage', [
        'pageTitle' => 'Data Prioritas',
        'description' => 'Daftar data prioritas yang menjadi fokus dalam pelaksanaan Satu Data Indonesia',
        'category' => 'Data Prioritas'
    ]);
})->name('priority-data.index');

// Routes for statistical data pages
Route::get('/statistical-data', function () {
    return Inertia::render('StatisticalIndexPage');
})->name('statistical-data.index');

Route::get('/statistical-data/basis-data', function () {
    return Inertia::render('StatisticalData/BasisDataStatistikPage');
})->name('statistical-data.basis-data');

Route::get('/statistical-data/export-import', function () {
    return Inertia::render('StatisticalData/EksporImporPage');
})->name('statistical-data.export-import');

Route::get('/statistical-data/gdp', function () {
    return Inertia::render('StatisticalData/ProdukDomestikBrutoPage');
})->name('statistical-data.gdp');

Route::get('/statistical-data/gdrp', function () {
    return Inertia::render('StatisticalData/ProdukDomestikRegionalBrutoPage');
})->name('statistical-data.gdrp');

Route::get('/statistical-data/ntp', function () {
    return Inertia::render('StatisticalData/NilaiTukarPetaniPage');
})->name('statistical-data.ntp');

// Additional routes for other statistical data pages
Route::get('/statistical-data/horticulture', function () {
    return Inertia::render('StatisticalIndexPage');
})->name('statistical-data.horticulture');

Route::get('/statistical-data/perkebunan', function () {
    return Inertia::render('StatisticalIndexPage');
})->name('statistical-data.perkebunan');

Route::get('/statistical-data/peternakan', function () {
    return Inertia::render('StatisticalIndexPage');
})->name('statistical-data.peternakan');

Route::get('/data/statistical', function () {
    return Inertia::render('StatisticalIndexPage');
})->name('data.statistical');

// Routes for user management pages (accessible without menuAdmin middleware)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin/user')->group(function () {
        Route::get('daftar-user', function () {
            return Inertia::render('admin/user/daftar-user');
        })->name('admin.user.daftar-user');
        
        Route::get('manajemen-menu', function () {
            return Inertia::render('admin/user/manajemen-menu');
        })->name('admin.user.manajemen-menu');
        
        Route::get('manajemen-submenu', function () {
            return Inertia::render('admin/user/manajemen-submenu');
        })->name('admin.user.manajemen-submenu');
        
        Route::get('manajemen-role', function () {
            return Inertia::render('admin/user/manajemen-role');
        })->name('admin.user.manajemen-role');
    });
});

// Additional statistical data routes
Route::get('/statistical-data/production', function () {
    return Inertia::render('StatisticalIndexPage');
})->name('statistical-data.production');

Route::get('/statistical-data/trade', function () {
    return Inertia::render('ExportImportPage');
})->name('statistical-data.trade');

Route::get('/statistical-data/prices', function () {
    return Inertia::render('StatisticalIndexPage');
})->name('statistical-data.prices');

Route::get('dashboard', function() {
    return redirect()->route('dashboard');
});

// Route::redirect('/dashboard', 'dashboard');
// Route::get('test', function () {
//     return 'Test Page';
// })->name('test.page');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         $firstAccessibleMenu = MenuHelper::getFirstAccessibleMenu();

//         if ($firstAccessibleMenu && Route::has($firstAccessibleMenu)) {
//             return redirect()->route($firstAccessibleMenu);
//         }

//         // If no accessible menu found, redirect to home with error message
//         return redirect()->route('home')->with('error', 'Anda tidak memiliki akses ke halaman apapun.');
//     })->name('dashboard');
// });

require __DIR__ . '/settings.php';
require __DIR__ . '/admin/admin.php';
