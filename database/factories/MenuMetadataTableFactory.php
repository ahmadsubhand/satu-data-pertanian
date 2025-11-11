<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MenuMetadataTable;

class MenuMetadataTableFactory extends Factory
{
    protected $model = MenuMetadataTable::class;

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
            'tanggal_rilis' => $this->faker->date,
            'abstraksi' => $this->faker->paragraph,
            'produsen_data_table_id' => \App\Models\ProdusenDataTable::factory(),
            'is_data_prioritas' => $this->faker->boolean,
            'kategori_data_table_id' => \App\Models\KategoriDataTable::factory(),
            'link_meta' => $this->faker->url,
            'file_meta1' => $this->faker->word . '.pdf',
            'file_meta2' => $this->faker->word . '.xlsx',
            'file_meta3' => $this->faker->word . '.doc',
            'ukuran_file' => $this->faker->numberBetween(1000, 10000000),
            'file_statistik' => $this->faker->word . '.pdf',
        ];
    }
}