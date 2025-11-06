<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $userRoles = UserRole::all();
        return response()->json($userRoles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'role' => 'required|string',
        ]);

        $userRole = UserRole::create([
            'role' => $request->role,
        ]);

        return response()->json($userRole, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserRole $userRole): JsonResponse
    {
        return response()->json($userRole);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserRole $userRole): JsonResponse
    {
        $request->validate([
            'role' => 'sometimes|required|string',
        ]);

        $userRole->update($request->only(['role']));

        return response()->json($userRole);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserRole $userRole): JsonResponse
    {
        $userRole->delete();
        return response()->json(null, 204);
    }
}