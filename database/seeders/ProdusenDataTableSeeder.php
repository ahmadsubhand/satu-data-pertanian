<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProdusenDataTable;

class ProdusenDataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $produsenData = [
            ['value' => 'KEMENTERIAN PERTANIAN'],
            ['value' => 'SEKRETARIAT JENDERAL'],
            ['value' => 'DIREKTORAT JENDERAL PRASARANA DAN SARANA PERTANIAN'],
            ['value' => 'DIREKTORAT JENDERAL TANAMAN PANGAN'],
            ['value' => 'DIREKTORAT JENDERAL HORTIKULTURA'],
            ['value' => 'DIREKTORAT JENDERAL PERKEBUNAN'],
            ['value' => 'DIREKTORAT JENDERAL PETERNAKAN DAN KESEHATAN HEWAN'],
            ['value' => 'INSPEKTORAT JENDERAL'],
            ['value' => 'BADAN PENELITIAN DAN PENGEMBANGAN'],
            ['value' => 'BADAN PENYULUHAN DAN PENGEMBANGAN SDM PERTANIAN'],
            ['value' => 'BADAN KETAHANAN PANGAN'],
            ['value' => 'BADAN KARANTINA PERTANIAN'],
            ['value' => 'DIREKTORAT JENDERAL LAHAN DAN IRIGASI PERTANIAN'],
            ['value' => 'BADAN PERAKITAN DAN MODERNISASI PERTANIAN'],
        ];

        foreach ($produsenData as $data) {
            ProdusenDataTable::create($data);
        }
    }
}