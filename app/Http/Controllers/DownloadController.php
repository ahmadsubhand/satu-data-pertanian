<?php

namespace App\Http\Controllers;

use App\Models\DownloadCounter;
use App\Models\MenuBeritaTable;
use App\Models\MenuPublikasiTable;
use App\Models\MenuMetadataTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function download(Request $request, $type, $id)
    {
        // Validate the type to prevent unauthorized access
        if (!in_array($type, ['berita', 'publikasi', 'dataset'])) {
            return response()->json(['error' => 'Invalid download type'], 400);
        }

        // Find the appropriate model based on type
        $model = null;
        $fileField = '';

        switch ($type) {
            case 'berita':
                $model = MenuBeritaTable::find($id);
                $fileField = 'file';
                break;
            case 'publikasi':
                $model = MenuPublikasiTable::find($id);
                $fileField = 'file';
                break;
            case 'dataset':
                $model = MenuMetadataTable::find($id);
                $fileField = 'file_statistik'; // or file_meta1, file_meta2, file_meta3
                break;
        }

        if (!$model) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        // Check if the file exists
        $fileName = $model->$fileField;
        if (!$fileName) {
            return response()->json(['error' => 'File not found'], 404);
        }

        // Check which type of item to determine the correct path
        $folder = '';
        switch ($type) {
            case 'berita':
                $folder = 'berita';
                break;
            case 'publikasi':
                $folder = 'publikasi';
                break;
            case 'dataset':
                $folder = 'metadata';
                break;
        }

        $filePath = $folder . '/' . $fileName;

        if (!Storage::exists($filePath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        // Increment the download counter
        $downloadCount = DownloadCounter::incrementDownload(
            get_class($model),
            $model->id
        );

        // Return the download response
        return Storage::download($filePath);
    }

    public function getDownloadCount(Request $request, $type, $id)
    {
        if (!in_array($type, ['berita', 'publikasi', 'dataset'])) {
            return response()->json(['error' => 'Invalid download type'], 400);
        }

        $model = null;
        switch ($type) {
            case 'berita':
                $model = MenuBeritaTable::find($id);
                break;
            case 'publikasi':
                $model = MenuPublikasiTable::find($id);
                break;
            case 'dataset':
                $model = MenuMetadataTable::find($id);
                break;
        }

        if (!$model) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        $count = DownloadCounter::getDownloadCount(get_class($model), $model->id);

        return response()->json(['download_count' => $count]);
    }
}