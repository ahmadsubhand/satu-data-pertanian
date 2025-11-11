<?php

namespace App\Http\Controllers;

use App\Models\MenuMetadataTable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuMetadataTableController extends MenuTableController
{
    protected $model = MenuMetadataTable::class;

    protected function validateRequest(Request $request, bool $isUpdate = false): array
    {
        $rules = [
            'user_id' => 'required|integer|exists:users,id',
            'judul' => 'required|string',
            'tanggal_rilis' => 'required|date',
            'abstraksi' => 'required|string',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
            'is_data_prioritas' => 'required|boolean',
            'kategori_data_table_id' => 'required|integer|exists:kategori_data_tables,id',
            'link_meta' => 'required|string',
            'file_meta1' => 'required|string',
            'file_meta2' => 'required|string',
            'file_meta3' => 'required|string',
            'ukuran_file' => 'required|integer',
            'file_statistik' => 'required|string',
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