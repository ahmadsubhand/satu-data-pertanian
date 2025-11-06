<?php

namespace App\Http\Controllers;

use App\Models\UserMenuUserRole;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserMenuUserRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $userMenuUserRoles = UserMenuUserRole::with(['userRole', 'userMenu'])->get();
        return response()->json($userMenuUserRoles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'user_role_id' => 'required|integer|exists:user_roles,id',
            'user_menu_id' => 'required|integer|exists:user_menus,id',
        ]);

        $userMenuUserRole = UserMenuUserRole::create([
            'user_role_id' => $request->user_role_id,
            'user_menu_id' => $request->user_menu_id,
        ]);

        return response()->json($userMenuUserRole, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserMenuUserRole $userMenuUserRole): JsonResponse
    {
        return response()->json($userMenuUserRole->load(['userRole', 'userMenu']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserMenuUserRole $userMenuUserRole): JsonResponse
    {
        $request->validate([
            'user_role_id' => 'sometimes|required|integer|exists:user_roles,id',
            'user_menu_id' => 'sometimes|required|integer|exists:user_menus,id',
        ]);

        $userMenuUserRole->update($request->only(['user_role_id', 'user_menu_id']));

        return response()->json($userMenuUserRole->load(['userRole', 'userMenu']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserMenuUserRole $userMenuUserRole): JsonResponse
    {
        $userMenuUserRole->delete();
        return response()->json(null, 204);
    }
}