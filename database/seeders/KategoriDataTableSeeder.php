<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\KategoriDataTable;

class KategoriDataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoriData = [
            ['value' => 'Terbuka'],
            ['value' => 'Tertutup'],
            ['value' => 'Terbatas'],
        ];

        foreach ($kategoriData as $data) {
            KategoriDataTable::create($data);
        }
    }
}