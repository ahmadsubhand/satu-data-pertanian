<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Menu Admin (ID: 1)
Route::middleware(['auth', 'verified'])->group(function () {
  Route::middleware('menuAdmin:1')->prefix('admin/user')->group(function () {
    Route::get('/', function () {
      return Inertia::render('admin/user/index');
    })->name('admin-user');
    
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
      Route::get('/', function () {
          return Inertia::render('admin/data/index');
      })->name('admin-data');
      
      // Submenu routes for data management
      Route::get('/input-data', function () {
          return Inertia::render('admin/data/input-data');
      })->name('admin-data-input');
      
      Route::get('/input-daftar-data', function () {
          return Inertia::render('admin/data/input-daftar-data');
      })->name('admin-data-input-daftar');
      
      Route::get('/input-data-variabel', function () {
          return Inertia::render('admin/data/input-data-variabel');
      })->name('admin-data-input-variabel');
      
      Route::get('/input-data-indikator', function () {
          return Inertia::render('admin/data/input-data-indikator');
      })->name('admin-data-input-indikator');
      
      Route::get('/input-link-website', function () {
          return Inertia::render('admin/data/input-link-website');
      })->name('admin-data-input-link');
  });
  
  // Berita (ID: 3)
  Route::middleware('menuAdmin:3')->prefix('admin/berita')->group(function () {
      Route::get('/', function () {
          return Inertia::render('admin/berita/index');
      })->name('admin-berita');
  });
  
  // Infografis (ID: 4)
  Route::middleware('menuAdmin:4')->prefix('admin/infografis')->group(function () {
      Route::get('/', function () {
          return Inertia::render('admin/infografis/index');
      })->name('admin-infografis');
  });
  
  // Publikasi (ID: 5)
  Route::middleware('menuAdmin:5')->prefix('admin/publikasi')->group(function () {
      Route::get('/', function () {
          return Inertia::render('admin/publikasi/index');
      })->name('admin-publikasi');
  });
  
  // Verifikasi Data Prioritas (ID: 6)
  Route::middleware('menuAdmin:6')->prefix('admin/verifikasi-data-prioritas')->group(function () {
      Route::get('/', function () {
          return Inertia::render('admin/verifikasi-data-prioritas/index');
      })->name('admin-verifikasi-data-prioritas');
  });
  
  // Foto/Video (ID: 7)
  Route::middleware('menuAdmin:7')->prefix('admin/foto-video')->group(function () {
      Route::get('/', function () {
          return Inertia::render('admin/foto-video/index');
      })->name('admin-foto-video');
  });
  
  // Verifikasi All Data (ID: 8)
  Route::middleware('menuAdmin:8')->prefix('admin/verifikasi-all-data')->group(function () {
      Route::get('/', function () {
          return Inertia::render('admin/verifikasi-all-data/index');
      })->name('admin-verifikasi-all-data');
  });
});