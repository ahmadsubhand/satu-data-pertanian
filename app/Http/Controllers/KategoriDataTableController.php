<?php

namespace App\Http\Controllers;

use App\Models\KategoriDataTable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class KategoriDataTableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $kategoriDataTables = KategoriDataTable::all();
        return response()->json($kategoriDataTables);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'value' => 'required|string',
        ]);

        $kategoriDataTable = KategoriDataTable::create([
            'value' => $request->value,
        ]);

        return response()->json($kategoriDataTable, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(KategoriDataTable $kategoriDataTable): JsonResponse
    {
        return response()->json($kategoriDataTable);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KategoriDataTable $kategoriDataTable): JsonResponse
    {
        $request->validate([
            'value' => 'sometimes|required|string',
        ]);

        $kategoriDataTable->update($request->only(['value']));

        return response()->json($kategoriDataTable);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KategoriDataTable $kategoriDataTable): JsonResponse
    {
        $kategoriDataTable->delete();
        return response()->json(null, 204);
    }
}