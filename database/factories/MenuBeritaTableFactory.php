<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MenuBeritaTable;

class MenuBeritaTableFactory extends Factory
{
    protected $model = MenuBeritaTable::class;

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
            'isi_singkat' => $this->faker->paragraph,
            'isi' => $this->faker->paragraphs(3, true),
            'file' => $this->faker->word . '.pdf',
            'foto' => $this->faker->word . '.jpg',
            'status' => $this->faker->randomElement(['Private', 'Publish']),
            'produsen_data_table_id' => \App\Models\ProdusenDataTable::factory(),
        ];
    }
}