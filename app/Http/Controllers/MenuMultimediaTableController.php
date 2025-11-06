<?php

namespace App\Http\Controllers;

use App\Models\MenuMultimediaTable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuMultimediaTableController extends MenuTableController
{
    protected $model = MenuMultimediaTable::class;

    protected function validateRequest(Request $request, bool $isUpdate = false): array
    {
        $rules = [
            'user_id' => 'required|integer|exists:users,id',
            'judul' => 'required|string',
            'keterangan' => 'required|string',
            'link_video' => 'required|string',
            'tanggal_rilis' => 'required|date',
            'file' => 'required|string',
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