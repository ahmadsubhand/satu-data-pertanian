<?php
require __DIR__.'/vendor/autoload.php';

use Illuminate\Support\Facades\DB;
use App\Models\MenuPublikasiTable;

// Check if model exists
if (class_exists('App\Models\MenuPublikasiTable')) {
    echo "Model exists\n";
} else {
    echo "Model does not exist\n";
}

// Check if there are publications in the database
try {
    $count = MenuPublikasiTable::count();
    echo "Number of publications: " . $count . "\n";
    
    $publikasi = MenuPublikasiTable::where('status', true)->limit(1)->get();
    echo "Sample publication: ";
    var_dump($publikasi->toArray());
} catch (Exception $e) {
    echo "Error querying database: " . $e->getMessage() . "\n";
}