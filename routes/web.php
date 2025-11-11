<?php

use App\Helpers\MenuHelper;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $firstAccessibleMenu = MenuHelper::getFirstAccessibleMenu();
        
        if ($firstAccessibleMenu && Route::has($firstAccessibleMenu)) {
            return redirect()->route($firstAccessibleMenu);
        }
        
        // If no accessible menu found, redirect to home with error message
        return redirect()->route('home')->with('error', 'Anda tidak memiliki akses ke halaman apapun.');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/admin/admin.php';