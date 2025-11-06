<?php

namespace App\Http\Controllers;

use App\Models\ProdusenDataTable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProdusenDataTableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $produsenDataTables = ProdusenDataTable::all();
        return response()->json($produsenDataTables);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'value' => 'required|string',
        ]);

        $produsenDataTable = ProdusenDataTable::create([
            'value' => $request->value,
        ]);

        return response()->json($produsenDataTable, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProdusenDataTable $produsenDataTable): JsonResponse
    {
        return response()->json($produsenDataTable);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProdusenDataTable $produsenDataTable): JsonResponse
    {
        $request->validate([
            'value' => 'sometimes|required|string',
        ]);

        $produsenDataTable->update($request->only(['value']));

        return response()->json($produsenDataTable);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProdusenDataTable $produsenDataTable): JsonResponse
    {
        $produsenDataTable->delete();
        return response()->json(null, 204);
    }
}