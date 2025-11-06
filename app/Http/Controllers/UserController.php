<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $users = User::with('userRole')->get();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nip' => 'required|string',
            'nama_lengkap' => 'required|string',
            'eselon' => 'required|string',
            'kodeunker' => 'required|string',
            'unit_kerja' => 'required|string',
            'hp' => 'required|string',
            'username' => 'required|string|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'user_role_id' => 'required|integer|exists:user_roles,id',
        ]);

        $user = User::create([
            'nip' => $request->nip,
            'nama_lengkap' => $request->nama_lengkap,
            'eselon' => $request->eselon,
            'kodeunker' => $request->kodeunker,
            'unit_kerja' => $request->unit_kerja,
            'hp' => $request->hp,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role_id' => $request->user_role_id,
        ]);

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): JsonResponse
    {
        return response()->json($user->load('userRole'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'nip' => 'sometimes|required|string',
            'nama_lengkap' => 'sometimes|required|string',
            'eselon' => 'sometimes|required|string',
            'kodeunker' => 'sometimes|required|string',
            'unit_kerja' => 'sometimes|required|string',
            'hp' => 'sometimes|required|string',
            'username' => 'sometimes|required|string|unique:users,username,' . $user->id,
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:8',
            'user_role_id' => 'sometimes|required|integer|exists:user_roles,id',
        ]);

        $user->update($request->only([
            'nip', 'nama_lengkap', 'eselon', 'kodeunker', 'unit_kerja', 'hp',
            'username', 'email', 'user_role_id'
        ]));

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        return response()->json($user->load('userRole'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(null, 204);
    }
}