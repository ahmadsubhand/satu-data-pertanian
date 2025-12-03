<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class DownloadCounter extends Model
{
    protected $fillable = [
        'downloadable_type',
        'downloadable_id',
        'download_count',
    ];

    protected $casts = [
        'download_count' => 'integer',
    ];

    /**
     * Get the downloadable model (News, Publication, Dataset, etc.).
     */
    public function downloadable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Increment the download count for the given item.
     */
    public static function incrementDownload(string $type, int $id): int
    {
        $counter = static::firstOrCreate([
            'downloadable_type' => $type,
            'downloadable_id' => $id,
        ], [
            'download_count' => 0,
        ]);

        $counter->increment('download_count');
        
        return $counter->download_count;
    }

    /**
     * Get the download count for the given item.
     */
    public static function getDownloadCount(string $type, int $id): int
    {
        $counter = static::where([
            'downloadable_type' => $type,
            'downloadable_id' => $id,
        ])->first();

        return $counter ? $counter->download_count : 0;
    }
}