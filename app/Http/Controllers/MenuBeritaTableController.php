<?php

namespace App\Http\Controllers;

use App\Models\MenuBeritaTable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuBeritaTableController extends MenuTableController
{
    protected $model = MenuBeritaTable::class;

    protected function validateRequest(Request $request, bool $isUpdate = false): array
    {
        $rules = [
            'user_id' => 'required|integer|exists:users,id',
            'judul' => 'required|string',
            'tanggal_rilis' => 'required|date',
            'isi_singkat' => 'required|string',
            'isi' => 'required|string',
            'file' => 'required|string',
            'foto' => 'required|string',
            'status' => 'required|string|in:Private,Publish',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
        ];

        if ($isUpdate) {
            // Make fields optional during update
            foreach ($rules as $field => $rule) {
                $rules[$field] = 'sometimes|' . $rule;
            }
        }

        return $request->validate($rules);
    }
}