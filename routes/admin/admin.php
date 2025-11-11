<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('menuAdmin:1')->prefix('admin/user')->get('/', function () {
  return Inertia::render('admin/admin');
});