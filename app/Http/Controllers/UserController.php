<?php

namespace App\Http\Controllers;

use App\Models\ProdusenDataTable;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::with('eselon', 'userRole')->get();
        
        $roles = UserRole::get();
        
        $eselon = ProdusenDataTable::get();

        return Inertia::render('admin/user/daftar-user', [
            "user" => $users,
            "roles" => $roles,
            "eselon" => $eselon
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nip' => 'required|string',
            'nama_lengkap' => 'required|string',
            'eselon' => 'required|integer|exists:produsen_data_tables,id',
            'unit_kerja' => 'required|string',
            'hp' => 'required|string',
            'username' => 'required|string|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'user_role_id' => 'required|integer|exists:user_roles,id',
        ]);

        // Find or create the eselon entry in ProdusenDataTable 
        $produsenDataTable = ProdusenDataTable::find($request->eselon);

        $user = User::create([
            'nip' => $request->nip,
            'nama_lengkap' => $request->nama_lengkap,
            'eselon' => $produsenDataTable->id,
            'unit_kerja' => $request->unit_kerja,
            'hp' => $request->hp,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role_id' => $request->user_role_id,
        ]);

        return redirect()->back()->with('success', 'User berhasil ditambahkan.');
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'nip' => 'sometimes|required|string',
            'nama_lengkap' => 'sometimes|required|string',
            'eselon' => 'sometimes|required|integer|exists:produsen_data_tables,id',
            'unit_kerja' => 'sometimes|required|string',
            'hp' => 'sometimes|required|string',
            'username' => 'sometimes|required|string|unique:users,username,' . $user->id,
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|nullable|string|min:8',
            'user_role_id' => 'sometimes|required|integer|exists:user_roles,id',
        ]);

        // Update eselon - find the eselon entry in ProdusenDataTable
        if ($request->has('eselon')) {
            $produsenDataTable = ProdusenDataTable::find($request->eselon);
            $user->eselon = $produsenDataTable->id;
        }

        $user->update($request->except(['eselon', 'password']));

        if ($request->has('password') && $request->password !== null) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        return redirect()->route('admin-user-list')->with('success', 'User berhasil diperbarui.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('admin-user-list')->with('success', 'User berhasil dihapus.');
    }
}