<?php

namespace App\Http\Controllers;

use App\Models\ProdusenDataTable;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $user = User::with('eselon', 'userRole')->get();
        $roles = UserRole::get();
        $eselon = ProdusenDataTable::get();
        return Inertia::render('admin/user/daftar-user', [
            "user" => $user,
            "roles" => $roles,
            "eselon" => $eselon
        ]);
    }
}