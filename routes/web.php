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


Route::get('/about', function () {
    return Inertia::render('About');
})->name('about.index');

Route::get('/auth/login', function () {
    return redirect('/login');
})->name('auth.login');

Route::get('/publikasi', [PublikasiController::class, 'publicIndex'])->name('publikasi.index');
Route::get('/publikasi/{id}', [PublikasiController::class, 'publicDetail'])->name('publikasi.detail');



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


Route::get('/data/geospatial', function () {
    return Inertia::render('GeospatialPage');
})->name('data.geospatial');

Route::get('/berita', [App\Http\Controllers\BeritaPublikController::class, 'index'])->name('berita.index');
Route::get('/berita/{id}', [App\Http\Controllers\BeritaPublikController::class, 'show'])->name('berita.show');

Route::get('/galeri', function () {
    $multimedia = \App\Models\MenuMultimediaTable::where('status', true)->orderBy('tanggal_rilis', 'desc')->get();
    return Inertia::render('MultimediaPage', [
        'multimedia' => $multimedia
    ]);
})->name('galeri.index');

Route::get('/galeri/{id}', function ($id) {
    $multimedia = \App\Models\MenuMultimediaTable::where('status', true)->findOrFail($id);
    return Inertia::render('MultimediaDetailPage', [
        'multimedia' => $multimedia
    ]);
})->where('id', '[0-9]+')->name('galeri.detail');

Route::get('/infografis', function () {
    $infografis = \App\Models\MenuInfografisTable::where('status', true)->orderBy('tanggal_rilis', 'desc')->get();
    return Inertia::render('InfografisPage', [
        'infografis' => $infografis
    ]);
})->name('infografis.index');

Route::get('/infografis/{id}', function ($id) {
    $infografis = \App\Models\MenuInfografisTable::where('status', true)->findOrFail($id);
    return Inertia::render('InfografisDetailPage', [
        'infografis' => $infografis
    ]);
})->where('id', '[0-9]+')->name('infografis.detail');

// Route for Instagram media page in multimedia submenu
Route::get('/media/instagram', function () {
    return Inertia::render('InstagramMediaPage');
})->name('media.instagram');

// Keep the old route for backward compatibility but redirect to the new one
Route::get('/products/multimedia', function () {
    return Inertia::render('InstagramMediaPage');
})->name('products.multimedia');

Route::get('/release-plans', function () {
    return Inertia::render('RencanaRilisPage');
})->name('release-plans.index');

Route::get('/metadata', function () {
    return Inertia::render('MetadataPage');
})->name('metadata.index');

Route::get('/satudata', function () {
    return redirect()->route('referensi-link.index');
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

Route::get('/referensi-link', [App\Http\Controllers\LinkController::class, 'index'])->name('referensi-link.index');



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

// Download routes for news, publications, and datasets
Route::get('/download/{type}/{id}', [App\Http\Controllers\DownloadController::class, 'download'])->name('download.file');
Route::get('/download-count/{type}/{id}', [App\Http\Controllers\DownloadController::class, 'getDownloadCount'])->name('download.count');

require __DIR__ . '/settings.php';
require __DIR__ . '/admin/admin.php';
