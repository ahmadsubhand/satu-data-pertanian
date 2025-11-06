<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MenuMultimediaTable;

class MenuMultimediaTableFactory extends Factory
{
    protected $model = MenuMultimediaTable::class;

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
            'keterangan' => $this->faker->paragraph,
            'link_video' => $this->faker->url,
            'tanggal_rilis' => $this->faker->date,
            'file' => $this->faker->word . '.mp4',
            'status' => $this->faker->randomElement(['Private', 'Publish']),
        ];
    }
}