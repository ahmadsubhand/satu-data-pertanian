<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MenuInfografisTable;

class MenuInfografisTableFactory extends Factory
{
    protected $model = MenuInfografisTable::class;

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
            'keterangan' => $this->faker->paragraph,
            'file' => $this->faker->word . '.png',
            'produsen_data_table_id' => \App\Models\ProdusenDataTable::factory(),
            'status' => $this->faker->randomElement(['Private', 'Publish']),
        ];
    }
}