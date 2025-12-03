<?php

namespace App\Http\Controllers;

use App\Models\MenuPublikasiTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class PublikasiController extends Controller
{
    protected $rootPathFile = 'publikasi';
    // public function index(): Response
    // {
    //     try {
    //         $rawData = MenuPublikasiTable::select([
    //             'id',
    //             'judul',
    //             'nomor_publikasi',
    //             'nomor_issn',
    //             'tanggal_rilis',
    //             'ukuran_file',
    //             'jumlah_halaman',
    //             'keterangan',
    //             'file',
    //             'abstraksi',
    //             'cover',
    //             'status',
    //             'created_at',
    //             'updated_at'
    //         ])
    //         ->get();

    //         $publikasi = [];
    //         foreach ($rawData as $item) {
    //             // Format dates safely
    //             $tanggalRilisFormatted = null;
    //             if ($item->tanggal_rilis) {
    //                 try {
    //                     $tanggalRilisFormatted = $item->tanggal_rilis->format('Y-m-d');
    //                 } catch (\Exception $e) {
    //                     $tanggalRilisFormatted = $item->tanggal_rilis;
    //                 }
    //             }

    //             $createdAtFormatted = null;
    //             if ($item->created_at) {
    //                 try {
    //                     $createdAtFormatted = $item->created_at->format('Y-m-d H:i:s');
    //                 } catch (\Exception $e) {
    //                     $createdAtFormatted = $item->created_at;
    //                 }
    //             }

    //             $updatedAtFormatted = null;
    //             if ($item->updated_at) {
    //                 try {
    //                     $updatedAtFormatted = $item->updated_at->format('Y-m-d H:i:s');
    //                 } catch (\Exception $e) {
    //                     $updatedAtFormatted = $item->updated_at;
    //                 }
    //             }

    //             $publikasi[] = [
    //                 'id' => $item->id,
    //                 'judul' => $item->judul ?? 'Tanpa Judul',
    //                 'nomor_publikasi' => $item->nomor_publikasi ?? null,
    //                 'nomor_issn' => $item->nomor_issn ?? null,
    //                 'tanggal_rilis' => $tanggalRilisFormatted,
    //                 'ukuran_file' => $item->ukuran_file,
    //                 'jumlah_halaman' => $item->jumlah_halaman,
    //                 'keterangan' => $item->keterangan ?? 'Tanpa Keterangan',
    //                 'deskripsi' => $item->keterangan ?? 'Tanpa Deskripsi', // Keeping the old name for compatibility
    //                 'tanggal_publikasi' => $tanggalRilisFormatted,
    //                 'status' => $item->status ? 'aktif' : 'tidak_aktif',
    //                 'kategori' => 'Publikasi', // Using a default category since it's not in the table
    //                 'url_file' => $item->file ?? '#',
    //                 'abstraksi' => $item->abstraksi ?? '',
    //                 'cover' => $item->cover ?? null,
    //                 'created_at' => $createdAtFormatted,
    //                 'updated_at' => $updatedAtFormatted
    //             ];
    //         }

    //         Log::info('Admin publication data retrieved successfully', ['count' => count($publikasi)]);

    //         return Inertia::render('admin/publikasi/index', [
    //             'publikasi' => $publikasi
    //         ]);
    //     } catch (\Exception $e) {
    //         Log::error('Error in admin index: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
    //         return Inertia::render('admin/publikasi/index', [
    //             'publikasi' => []
    //         ]);
    //     }
    // }

    public function publicIndex(): Response
    {
        try {
            $rawData = MenuPublikasiTable::where('status', true)
                ->select([
                    'id',
                    'judul',
                    'keterangan',
                    'tanggal_rilis',
                    'file',
                    'cover',
                    'created_at',
                    'updated_at',
                    'ukuran_file',
                    'jumlah_halaman',
                    'abstraksi',
                    'nomor_publikasi',
                    'nomor_issn'
                ])
                ->orderBy('tanggal_rilis', 'desc')
                ->get();

            $publikasi = [];
            foreach ($rawData as $item) {
                // Format dates safely
                $tanggalRilisFormatted = 'N/A';
                if ($item->tanggal_rilis) {
                    try {
                        $tanggalRilisFormatted = $item->tanggal_rilis->format('Y-m-d');
                    } catch (\Exception $e) {
                        $tanggalRilisFormatted = $item->tanggal_rilis ?? 'N/A'; // Use raw value if formatting fails
                    }
                }
                if ($item->file) {
                    $item->file = Storage::disk('public')->url($this->rootPathFile . '/' . $item->file);
                }
                if ($item->cover && $item->cover !== 'default-cover.png') {
                    // Check if the file exists with the exact name as stored in DB
                    $coverPath = $this->rootPathFile . '/' . $item->cover;
                    $coverPathOnDisk = storage_path('app/public/' . $coverPath);

                    if (!file_exists($coverPathOnDisk)) {
                        // If file doesn't exist with exact case, try to find it with different case variations
                        $fileDirectory = storage_path('app/public/' . $this->rootPathFile . '/');
                        $baseFilename = pathinfo($item->cover, PATHINFO_FILENAME);

                        // Look for file with same name but different extension case
                        $files = glob($fileDirectory . $baseFilename . '.*');
                        if ($files && count($files) > 0) {
                            foreach ($files as $file) {
                                $actualFileName = basename($file);
                                $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                break;
                            }
                        } else {
                            // If no variation found, set to null so frontend can use default
                            $item->cover = null;
                        }
                    } else {
                        $item->cover = Storage::disk('public')->url($coverPath);
                    }
                } else {
                    // If no cover is set in the database, try to find an image based on the title
                    if (!$item->cover) {
                        $fileDirectory = storage_path('app/public/' . $this->rootPathFile . '/');
                        $title = $item->judul; // Use the publication title

                        // Clean the title to make it filename-friendly
                        $cleanTitle = preg_replace('/[^a-zA-Z0-9]/', '', $title);

                        // Look for any image files that might match the title
                        $imageExtensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif'];
                        foreach ($imageExtensions as $ext) {
                            $pattern = $fileDirectory . '*' . $cleanTitle . '*' . $ext;
                            $files = glob($pattern, GLOB_NOCASE); // Case insensitive
                            if ($files && count($files) > 0) {
                                $actualFileName = basename($files[0]);
                                $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                break;
                            }
                        }

                        // If still no file found, try broader search including common patterns
                        if (!$item->cover) {
                            // Search for any files that partially match the title (case insensitive)
                            $allFiles = glob($fileDirectory . '*');
                            $titleLower = strtolower($title);

                            foreach ($allFiles as $file) {
                                $filename = strtolower(basename($file));
                                $fileWithoutExt = strtolower(pathinfo($file, PATHINFO_FILENAME));

                                // Create multiple variations to handle different possible mismatches
                                // Original normalized comparison
                                $normalizedTitle = preg_replace('/\s+/', '', $titleLower); // Remove all spaces
                                $normalizedFile = preg_replace('/\s+/', '', $fileWithoutExt); // Remove all spaces

                                // Compare variations to handle various possible mismatches
                                $titleVariations = [
                                    $titleLower, // Original
                                    $normalizedTitle, // No spaces
                                    str_replace([' ', '_', '-', '.'], ['', '', '', ''], $titleLower), // No spaces, underscores, dashes, or dots
                                    str_replace(' ', '_', $titleLower), // Spaces as underscores
                                    str_replace('_', ' ', $titleLower), // Underscores as spaces
                                    preg_replace('/\s+/', '_', preg_replace('/[^\w\s]/', '', $titleLower)), // Remove special chars, spaces as _
                                ];

                                $fileVariations = [
                                    $fileWithoutExt, // Original
                                    $normalizedFile, // No spaces
                                    str_replace([' ', '_', '-', '.'], ['', '', '', ''], $fileWithoutExt), // No spaces, underscores, dashes or dots
                                    str_replace(' ', '_', $fileWithoutExt), // Spaces as underscores
                                    str_replace('_', ' ', $fileWithoutExt), // Underscores as spaces
                                    preg_replace('/\s+/', '_', preg_replace('/[^\w\s]/', '', $fileWithoutExt)), // Remove special chars, spaces as _
                                ];

                                $matchFound = false;
                                foreach ($titleVariations as $titleVar) {
                                    foreach ($fileVariations as $fileVar) {
                                        // Check if one contains the other or they're very similar
                                        if (strpos($titleVar, $fileVar) !== false ||
                                            strpos($fileVar, $titleVar) !== false) {
                                            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                                            if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                                                $actualFileName = basename($file);
                                                $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                                $matchFound = true;
                                                break 2; // Break both loops
                                            }
                                        }
                                    }
                                    if ($matchFound) break;
                                }

                                // If no match found yet, try looking for files with "-cover", "gambar", or similar patterns
                                if (!$matchFound && !$item->cover) {
                                    $cleanPublicationWords = array_filter(preg_split('/[^a-zA-Z0-9]/', $titleLower));
                                    $cleanFileWords = array_filter(preg_split('/[^a-zA-Z0-9]/', $fileWithoutExt));

                                    // Calculate word overlap ratio to determine if it's a good match
                                    $matchingWords = array_intersect($cleanPublicationWords, $cleanFileWords);
                                    $totalPublicationWords = count($cleanPublicationWords);
                                    $totalFileWords = count($cleanFileWords);

                                    // If at least 60% of the shorter title's words are in the filename
                                    // or if the filename contains key parts of the publication title
                                    if (($totalPublicationWords > 0 && count($matchingWords) / $totalPublicationWords >= 0.5) ||
                                        ($totalFileWords > 0 && count($matchingWords) / $totalFileWords >= 0.5)) {
                                        // For the kambing domba case: "outlook kambing domba tahun 2020" vs "outlook_kambingdomba2020"
                                        // We should also check if key terms match
                                        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                                        if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                                            $actualFileName = basename($file);
                                            $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                        }
                                    }

                                    // Also check for common patterns like "cover", "gambar", etc.
                                    if (!$item->cover && (strpos(strtolower($fileWithoutExt), 'cover') !== false ||
                                                          strpos(strtolower($fileWithoutExt), 'gambar') !== false)) {
                                        $cleanPublicationTitle = preg_replace('/[^a-zA-Z0-9]/', '', $titleLower);
                                        $cleanFileTitle = preg_replace('/[^a-zA-Z0-9]/', '', $fileWithoutExt);

                                        if (strpos($cleanFileTitle, str_replace([' ', '_'], ['', ''], $cleanPublicationTitle)) !== false) {
                                            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                                            if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                                                $actualFileName = basename($file);
                                                $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                            }
                                        }
                                    }
                                }
                            }

                            // If still no match found, try searching for common filenames like Capture, Thumbnail, etc.
                            if (!$item->cover) {
                                $commonPatterns = ['capture*', 'thumbnail*', 'gambar*', 'image*', 'photo*', 'pic*'];

                                foreach ($commonPatterns as $pattern) {
                                    $imageExtensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif'];
                                    foreach ($imageExtensions as $ext) {
                                        $searchPattern = $fileDirectory . $pattern . $ext;
                                        $files = glob($searchPattern, GLOB_NOCASE);
                                        if ($files && count($files) > 0) {
                                            $actualFileName = basename($files[0]);
                                            $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                            break 2; // Break both loops if found
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                $createdAtFormatted = 'N/A';
                if ($item->created_at) {
                    try {
                        $createdAtFormatted = $item->created_at->format('Y-m-d H:i:s');
                    } catch (\Exception $e) {
                        $createdAtFormatted = $item->created_at ?? 'N/A'; // Use raw value if formatting fails
                    }
                }

                $updatedAtFormatted = 'N/A';
                if ($item->updated_at) {
                    try {
                        $updatedAtFormatted = $item->updated_at->format('Y-m-d H:i:s');
                    } catch (\Exception $e) {
                        $updatedAtFormatted = $item->updated_at ?? 'N/A'; // Use raw value if formatting fails
                    }
                }

                $publikasi[] = [
                    'id' => $item->id,
                    'judul' => $item->judul ?? 'Tanpa Judul',
                    'tanggal_rilis' => $tanggalRilisFormatted,
                    'keterangan' => $item->keterangan ?? null,
                    'nomor_publikasi' => $item->nomor_publikasi ?? null,
                    'nomor_issn' => $item->nomor_issn ?? null,
                    'file' => $item->file ?? '#',
                    'cover' => $item->cover ?? 'default-cover.png',
                    'ukuran_file' => $item->ukuran_file ?? 0,
                    'jumlah_halaman' => $item->jumlah_halaman ?? 0,
                    'abstraksi' => $item->abstraksi ?? '',
                    'created_at' => $createdAtFormatted,
                    'updated_at' => $updatedAtFormatted,
                ];
            }

            return Inertia::render('PublikasiPage', [
                'publikasi' => $publikasi
            ]);
        } catch (\Exception $e) {
            Log::error('Error in publicIndex: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return Inertia::render('PublikasiPage', [
                'publikasi' => []
            ]);
        }
    }
    public function publicDetail($id): Response
    {
        try {
            $item = MenuPublikasiTable::where('status', true)
                ->where('id', $id)
                ->select([
                    'id',
                    'judul',
                    'keterangan',
                    'tanggal_rilis',
                    'file',
                    'cover',
                    'created_at',
                    'updated_at',
                    'ukuran_file',
                    'jumlah_halaman',
                    'abstraksi',
                    'nomor_publikasi',
                    'nomor_issn'
                ])
                ->firstOrFail();

            // Format dates safely
            $tanggalRilisFormatted = 'N/A';
            if ($item->tanggal_rilis) {
                try {
                    $tanggalRilisFormatted = $item->tanggal_rilis->format('Y-m-d');
                } catch (\Exception $e) {
                    $tanggalRilisFormatted = $item->tanggal_rilis ?? 'N/A'; // Use raw value if formatting fails
                }
            }
            if ($item->file) {
                $item->file = Storage::disk('public')->url($this->rootPathFile . '/' . $item->file);
            }
            if ($item->cover && $item->cover !== 'default-cover.png') {
                // Check if the file exists with the exact name as stored in DB
                $coverPath = $this->rootPathFile . '/' . $item->cover;
                $coverPathOnDisk = storage_path('app/public/' . $coverPath);

                if (!file_exists($coverPathOnDisk)) {
                    // If file doesn't exist with exact case, try to find it with different case variations
                    $fileDirectory = storage_path('app/public/' . $this->rootPathFile . '/');
                    $baseFilename = pathinfo($item->cover, PATHINFO_FILENAME);

                    // Look for file with same name but different extension case
                    $files = glob($fileDirectory . $baseFilename . '.*');
                    if ($files && count($files) > 0) {
                        foreach ($files as $file) {
                            $actualFileName = basename($file);
                            $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                            break;
                        }
                    } else {
                        // If no variation found, set to null so frontend can use default
                        $item->cover = null;
                    }
                } else {
                    $item->cover = Storage::disk('public')->url($coverPath);
                }
            } else {
                // If no cover is set in the database, try to find an image based on the title
                if (!$item->cover) {
                    $fileDirectory = storage_path('app/public/' . $this->rootPathFile . '/');
                    $title = $item->judul; // Use the publication title

                    // Clean the title to make it filename-friendly
                    $cleanTitle = preg_replace('/[^a-zA-Z0-9]/', '', $title);

                    // Look for any image files that might match the title
                    $imageExtensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif'];
                    foreach ($imageExtensions as $ext) {
                        $pattern = $fileDirectory . '*' . $cleanTitle . '*' . $ext;
                        $files = glob($pattern, GLOB_NOCASE); // Case insensitive
                        if ($files && count($files) > 0) {
                            $actualFileName = basename($files[0]);
                            $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                            break;
                        }
                    }

                    // If still no file found, try broader search including common patterns
                    if (!$item->cover) {
                        // Search for any files that partially match the title (case insensitive)
                        $allFiles = glob($fileDirectory . '*');
                        $titleLower = strtolower($title);

                        foreach ($allFiles as $file) {
                            $filename = strtolower(basename($file));
                            $fileWithoutExt = strtolower(pathinfo($file, PATHINFO_FILENAME));

                            // Create multiple variations to handle different possible mismatches
                            // Original normalized comparison
                            $normalizedTitle = preg_replace('/\s+/', '', $titleLower); // Remove all spaces
                            $normalizedFile = preg_replace('/\s+/', '', $fileWithoutExt); // Remove all spaces

                            // Compare variations to handle various possible mismatches
                            $titleVariations = [
                                $titleLower, // Original
                                $normalizedTitle, // No spaces
                                str_replace([' ', '_', '-', '.'], ['', '', '', ''], $titleLower), // No spaces, underscores, dashes, or dots
                                str_replace(' ', '_', $titleLower), // Spaces as underscores
                                str_replace('_', ' ', $titleLower), // Underscores as spaces
                                preg_replace('/\s+/', '_', preg_replace('/[^\w\s]/', '', $titleLower)), // Remove special chars, spaces as _
                            ];

                            $fileVariations = [
                                $fileWithoutExt, // Original
                                $normalizedFile, // No spaces
                                str_replace([' ', '_', '-', '.'], ['', '', '', ''], $fileWithoutExt), // No spaces, underscores, dashes or dots
                                str_replace(' ', '_', $fileWithoutExt), // Spaces as underscores
                                str_replace('_', ' ', $fileWithoutExt), // Underscores as spaces
                                preg_replace('/\s+/', '_', preg_replace('/[^\w\s]/', '', $fileWithoutExt)), // Remove special chars, spaces as _
                            ];

                            $matchFound = false;
                            foreach ($titleVariations as $titleVar) {
                                foreach ($fileVariations as $fileVar) {
                                    // Check if one contains the other or they're very similar
                                    if (strpos($titleVar, $fileVar) !== false ||
                                        strpos($fileVar, $titleVar) !== false) {
                                        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                                        if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                                            $actualFileName = basename($file);
                                            $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                            $matchFound = true;
                                            break 2; // Break both loops
                                        }
                                    }
                                }
                                if ($matchFound) break;
                            }

                            // If no match found yet, try looking for files with "-cover", "gambar", or similar patterns
                            if (!$matchFound && !$item->cover) {
                                $cleanPublicationWords = array_filter(preg_split('/[^a-zA-Z0-9]/', $titleLower));
                                $cleanFileWords = array_filter(preg_split('/[^a-zA-Z0-9]/', $fileWithoutExt));

                                // Calculate word overlap ratio to determine if it's a good match
                                $matchingWords = array_intersect($cleanPublicationWords, $cleanFileWords);
                                $totalPublicationWords = count($cleanPublicationWords);
                                $totalFileWords = count($cleanFileWords);

                                // If at least 60% of the shorter title's words are in the filename
                                // or if the filename contains key parts of the publication title
                                if (($totalPublicationWords > 0 && count($matchingWords) / $totalPublicationWords >= 0.5) ||
                                    ($totalFileWords > 0 && count($matchingWords) / $totalFileWords >= 0.5)) {
                                    // For cases like "outlook kambing domba tahun 2020" vs "outlook_kambingdomba2020"
                                    // We should also check if key terms match
                                    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                                    if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                                        $actualFileName = basename($file);
                                        $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                    }
                                }

                                // Also check for common patterns like "cover", "gambar", etc.
                                if (!$item->cover && (strpos(strtolower($fileWithoutExt), 'cover') !== false ||
                                                      strpos(strtolower($fileWithoutExt), 'gambar') !== false)) {
                                    $cleanPublicationTitle = preg_replace('/[^a-zA-Z0-9]/', '', $titleLower);
                                    $cleanFileTitle = preg_replace('/[^a-zA-Z0-9]/', '', $fileWithoutExt);

                                    if (strpos($cleanFileTitle, str_replace([' ', '_'], ['', ''], $cleanPublicationTitle)) !== false) {
                                        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                                        if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                                            $actualFileName = basename($file);
                                            $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                        }
                                    }
                                }
                            }
                        }

                        // If still no match found, try searching for common filenames like Capture, Thumbnail, etc.
                        if (!$item->cover) {
                            $commonPatterns = ['capture*', 'thumbnail*', 'gambar*', 'image*', 'photo*', 'pic*'];

                            foreach ($commonPatterns as $pattern) {
                                $imageExtensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif'];
                                foreach ($imageExtensions as $ext) {
                                    $searchPattern = $fileDirectory . $pattern . $ext;
                                    $files = glob($searchPattern, GLOB_NOCASE);
                                    if ($files && count($files) > 0) {
                                        $actualFileName = basename($files[0]);
                                        $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $actualFileName);
                                        break 2; // Break both loops if found
                                    }
                                }
                            }
                        }
                    }
                }
            }
            $createdAtFormatted = 'N/A';
            if ($item->created_at) {
                try {
                    $createdAtFormatted = $item->created_at->format('Y-m-d H:i:s');
                } catch (\Exception $e) {
                    $createdAtFormatted = $item->created_at ?? 'N/A'; // Use raw value if formatting fails
                }
            }

            $updatedAtFormatted = 'N/A';
            if ($item->updated_at) {
                try {
                    $updatedAtFormatted = $item->updated_at->format('Y-m-d H:i:s');
                } catch (\Exception $e) {
                    $updatedAtFormatted = $item->updated_at ?? 'N/A'; // Use raw value if formatting fails
                }
            }

            $publikasi = [
                'id' => $item->id,
                'judul' => $item->judul ?? 'Tanpa Judul',
                'tanggal_rilis' => $tanggalRilisFormatted,
                'keterangan' => $item->keterangan ?? null,
                'nomor_publikasi' => $item->nomor_publikasi ?? null,
                'nomor_issn' => $item->nomor_issn ?? null,
                'file' => $item->file ?? '#',
                'cover' => $item->cover ?? 'default-cover.png',
                'ukuran_file' => $item->ukuran_file ?? 0,
                'jumlah_halaman' => $item->jumlah_halaman ?? 0,
                'abstraksi' => $item->abstraksi ?? '',
                'created_at' => $createdAtFormatted,
                'updated_at' => $updatedAtFormatted,
            ];

            return Inertia::render('PublikasiDetailPage', [
                'publikasi' => $publikasi
            ]);
        } catch (\Exception $e) {
            Log::error('Error in publicDetail: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return Inertia::render('PublikasiDetailPage', [
                'publikasi' => []
            ]);
        }
    }
}