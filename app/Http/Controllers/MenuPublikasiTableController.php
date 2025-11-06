<?php

namespace App\Http\Controllers;

use App\Models\MenuPublikasiTable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuPublikasiTableController extends MenuTableController
{
    protected $model = MenuPublikasiTable::class;

    protected function validateRequest(Request $request, bool $isUpdate = false): array
    {
        $rules = [
            'user_id' => 'required|integer|exists:users,id',
            'judul' => 'required|string',
            'ukuran_file' => 'required|integer',
            'jumlah_halaman' => 'required|integer',
            'keterangan' => 'required|string',
            'file' => 'required|string',
            'produsen_data_table_id' => 'required|integer|exists:produsen_data_tables,id',
            'abstraksi' => 'required|string',
            'cover' => 'required|string',
            'status' => 'required|string|in:Private,Publish',
        ];

        // Optional fields
        $optionalRules = [
            'nomor_publikasi' => 'nullable|string',
            'nomor_issn' => 'nullable|string',
            'tanggal_rilis' => 'nullable|date',
        ];

        $rules = array_merge($rules, $optionalRules);

        if ($isUpdate) {
            // Make fields optional during update
            foreach ($rules as $field => $rule) {
                $rules[$field] = 'sometimes|' . $rule;
            }
        }

        return $request->validate($rules);
    }
}