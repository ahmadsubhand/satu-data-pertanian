<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\FotoVideoController;
use App\Http\Controllers\InfografisController;
use App\Http\Controllers\InputDataController;
use App\Http\Controllers\InputDaftarDataController;
use App\Http\Controllers\InputDataIndikatorController;
use App\Http\Controllers\InputDataVariabelController;
use App\Http\Controllers\InputLinkWebsiteController;
use App\Http\Controllers\KalenderDataController;
use App\Http\Controllers\ManajemenUserController;
use App\Http\Controllers\PublikasiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifikasiDataPrioritasController;
use App\Http\Controllers\VerifikasiAllDataController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Menu Admin (ID: 1)
Route::middleware(['auth', 'verified'])->group(function () {
  Route::middleware('menuAdmin:1')->prefix('admin')->group(function () {
    Route::get('/manajemen-user', [ManajemenUserController::class, 'index'])->name('admin-manajemen-user');
  });

  Route::middleware('menuAdmin:1')->prefix('admin/user')->group(function () {

    // Submenu routes for user management
    Route::prefix('daftar-user')->group(function () {
      Route::get('/', [UserController::class, 'index'])->name('admin-user-list');
      Route::post('/', [UserController::class, 'store'])->name('admin-user-store');
      Route::put('/{user}', [UserController::class, 'update'])->name('admin-user-update');
      Route::delete('/{user}', [UserController::class, 'destroy'])->name('admin-user-destroy');
    });

    Route::get('/manajemen-menu', function () {
      return Inertia::render('admin/user/manajemen-menu');
    })->name('admin-menu-management');

    Route::get('/manajemen-submenu', function () {
      return Inertia::render('admin/user/manajemen-submenu');
    })->name('admin-submenu-management');

    Route::get('/manajemen-role', function () {
      return Inertia::render('admin/user/manajemen-role');
    })->name('admin-role-management');
  });

  // Data (ID: 2)
  Route::middleware('menuAdmin:2')->prefix('admin/data')->group(function () {
      Route::get('/', [DataController::class, 'index'])->name('admin-data');

      // Submenu routes for data management
      Route::prefix('input-data')->group(function () {
          Route::get('/', [InputDataController::class, 'index'])->name('admin-data-input');
          Route::post('/', [InputDataController::class, 'store'])->name('admin-data-input-store');
          Route::put('/{id}', [InputDataController::class, 'update'])->name('admin-data-input-update');
          Route::delete('/{id}', [InputDataController::class, 'destroy'])->name('admin-data-input-destroy');
      });

      Route::prefix('input-daftar-data')->group(function () {
          Route::get('/', [InputDaftarDataController::class, 'index'])->name('admin-data-input-daftar');
          Route::post('/', [InputDaftarDataController::class, 'store'])->name('admin-data-input-daftar-store');
          Route::put('/{id}', [InputDaftarDataController::class, 'update'])->name('admin-data-input-daftar-update');
          Route::delete('/{id}', [InputDaftarDataController::class, 'destroy'])->name('admin-data-input-daftar-destroy');
      });

      Route::prefix('input-data-variabel')->group(function () {
          Route::get('/', [InputDataVariabelController::class, 'index'])->name('admin-data-input-variabel');
          Route::post('/', [InputDataVariabelController::class, 'store'])->name('admin-data-input-variabel-store');
          Route::put('/{id}', [InputDataVariabelController::class, 'update'])->name('admin-data-input-variabel-update');
          Route::delete('/{id}', [InputDataVariabelController::class, 'destroy'])->name('admin-data-input-variabel-destroy');
      });

      Route::prefix('input-data-indikator')->group(function () {
          Route::get('/', [InputDataIndikatorController::class, 'index'])->name('admin-data-input-indikator');
          Route::post('/', [InputDataIndikatorController::class, 'store'])->name('admin-data-input-indikator-store');
          Route::put('/{id}', [InputDataIndikatorController::class, 'update'])->name('admin-data-input-indikator-update');
          Route::delete('/{id}', [InputDataIndikatorController::class, 'destroy'])->name('admin-data-input-indikator-destroy');
      });

      Route::prefix('input-link-website')->group(function () {
          Route::get('/', [InputLinkWebsiteController::class, 'index'])->name('admin-data-input-link');
          Route::post('/', [InputLinkWebsiteController::class, 'store'])->name('admin-data-input-link-store');
          Route::put('/{id}', [InputLinkWebsiteController::class, 'update'])->name('admin-data-input-link-update');
          Route::delete('/{id}', [InputLinkWebsiteController::class, 'destroy'])->name('admin-data-input-link-destroy');
      });

      Route::prefix('kalender')->group(function () {
          Route::get('/', [KalenderDataController::class, 'index'])->name('admin-data-kalender');
          Route::post('/', [KalenderDataController::class, 'store'])->name('admin-data-kalender-store');
          Route::put('/{id}', [KalenderDataController::class, 'update'])->name('admin-data-kalender-update');
          Route::delete('/{id}', [KalenderDataController::class, 'destroy'])->name('admin-data-kalender-destroy');
      });
  });
  
  // Berita (ID: 3)
  Route::middleware('menuAdmin:3')->prefix('admin/berita')->group(function () {
      Route::get('/', [BeritaController::class, 'index'])->name('admin-berita');
  });

  // Infografis (ID: 4)
  Route::middleware('menuAdmin:4')->prefix('admin/infografis')->group(function () {
      Route::get('/', [InfografisController::class, 'index'])->name('admin-infografis');
  });

  // Publikasi (ID: 5)
  Route::middleware('menuAdmin:5')->prefix('admin/publikasi')->group(function () {
      Route::get('/', [PublikasiController::class, 'index'])->name('admin-publikasi');
  });

  // Verifikasi Data Prioritas (ID: 6)
  Route::middleware('menuAdmin:6')->prefix('admin/verifikasi-data-prioritas')->group(function () {
      Route::get('/', [VerifikasiDataPrioritasController::class, 'index'])->name('admin-verifikasi-data-prioritas');
  });

  // Verifikasi All Data (ID: 9)
  Route::middleware('menuAdmin:9')->prefix('admin/verifikasi-all-data')->group(function () {
      Route::get('/', [VerifikasiAllDataController::class, 'index'])->name('admin-verifikasi-all-data');
  });

  // Foto/Video (ID: 7)
  Route::middleware('menuAdmin:7')->prefix('admin/foto-video')->group(function () {
      Route::get('/', [FotoVideoController::class, 'index'])->name('admin-foto-video');
  });

  // Media (ID: 8)
  Route::middleware('menuAdmin:8')->prefix('admin/media')->group(function () {
      Route::get('/', [FotoVideoController::class, 'index'])->name('admin-media');
      Route::post('/', [FotoVideoController::class, 'store'])->name('admin-media-store');
      Route::put('/{id}', [FotoVideoController::class, 'update'])->name('admin-media-update');
      Route::delete('/{id}', [FotoVideoController::class, 'destroy'])->name('admin-media-destroy');
  });
});