<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ProdusenDataTable;

class ProdusenDataTableFactory extends Factory
{
    protected $model = ProdusenDataTable::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'value' => $this->faker->randomElement([
                'KEMENTERIAN PERTANIAN',
                'SEKRETARIAT JENDERAL',
                'DIREKTORAT JENDERAL PRASARANA DAN SARANA PERTANIAN',
                'DIREKTORAT JENDERAL TANAMAN PANGAN',
                'DIREKTORAT JENDERAL HORTIKULTURA',
                'DIREKTORAT JENDERAL PERKEBUNAN',
                'DIREKTORAT JENDERAL PETERNAKAN DAN KESEHATAN HEWAN',
                'INSPEKTORAT JENDERAL',
                'BADAN PENELITIAN DAN PENGEMBANGAN',
                'BADAN PENYULUHAN DAN PENGEMBANGAN SDM PERTANIAN',
                'BADAN KETAHANAN PANGAN',
                'BADAN KARANTINA PERTANIAN',
                'DIREKTORAT JENDERAL LAHAN DAN IRIGASI PERTANIAN',
                'BADAN PERAKITAN DAN MODERNISASI PERTANIAN',
            ]),
        ];
    }
}