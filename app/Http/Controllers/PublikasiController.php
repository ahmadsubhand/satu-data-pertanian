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
                if ($item->cover) {
                    $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $item->cover);
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
            if ($item->cover) {
                $item->cover = Storage::disk('public')->url($this->rootPathFile . '/' . $item->cover);
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