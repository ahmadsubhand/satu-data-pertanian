<?php

namespace App\Http\Controllers;

use App\Models\MenuInfografisTable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuInfografisTableController extends MenuTableController
{
    protected $model = MenuInfografisTable::class;

    protected function validateRequest(Request $request, bool $isUpdate = false): array
    {
        $rules = [
            'user_id' => 'required|integer|exists:users,id',
            'judul' => 'required|string',
            'tanggal_rilis' => 'required|date',
            'keterangan' => 'required|string',
            'file' => 'required|string',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
            'status' => 'required|string|in:Private,Publish',
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