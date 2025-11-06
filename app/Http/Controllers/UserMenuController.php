<?php

namespace App\Http\Controllers;

use App\Models\UserMenu;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $userMenus = UserMenu::all();
        return response()->json($userMenus);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'menu' => 'required|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $userMenu = UserMenu::create([
            'menu' => $request->menu,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json($userMenu, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserMenu $userMenu): JsonResponse
    {
        return response()->json($userMenu);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserMenu $userMenu): JsonResponse
    {
        $request->validate([
            'menu' => 'sometimes|required|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $userMenu->update($request->only(['menu', 'is_active']));

        return response()->json($userMenu);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserMenu $userMenu): JsonResponse
    {
        $userMenu->delete();
        return response()->json(null, 204);
    }
}