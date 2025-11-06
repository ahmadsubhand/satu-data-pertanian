<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

abstract class MenuTableController extends Controller
{
    protected $model;

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $menuTables = $this->model::with(['user', 'produsenDataTable'])->get();
        return response()->json($menuTables);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $this->validateRequest($request);
        $menuTable = $this->model::create($validatedData);
        return response()->json($menuTable->load(['user', 'produsenDataTable']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $menuTable = $this->model::with(['user', 'produsenDataTable'])->findOrFail($id);
        return response()->json($menuTable);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $menuTable = $this->model::findOrFail($id);
        $validatedData = $this->validateRequest($request, true);
        
        $menuTable->update($validatedData);
        return response()->json($menuTable->load(['user', 'produsenDataTable']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $menuTable = $this->model::findOrFail($id);
        $menuTable->delete();
        return response()->json(null, 204);
    }

    abstract protected function validateRequest(Request $request, bool $isUpdate = false): array;
}