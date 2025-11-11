<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MenuPublikasiTable;

class MenuPublikasiTableFactory extends Factory
{
    protected $model = MenuPublikasiTable::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'judul' => $this->faker->sentence,
            'nomor_publikasi' => $this->faker->optional()->word,
            'nomor_issn' => $this->faker->optional()->word,
            'tanggal_rilis' => $this->faker->optional()->date,
            'ukuran_file' => $this->faker->numberBetween(1000, 10000000),
            'jumlah_halaman' => $this->faker->numberBetween(1, 500),
            'keterangan' => $this->faker->paragraph,
            'file' => $this->faker->word . '.pdf',
            'produsen_data_table_id' => \App\Models\ProdusenDataTable::factory(),
            'abstraksi' => $this->faker->paragraph,
            'cover' => $this->faker->word . '.jpg',
            'status' => $this->faker->randomElement(['Private', 'Publish']),
        ];
    }
}