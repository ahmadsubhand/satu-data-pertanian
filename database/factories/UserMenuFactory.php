<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UserMenu;

class UserMenuFactory extends Factory
{
    protected $model = UserMenu::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'menu' => $this->faker->randomElement(['Menu Admin', 'Data', 'Berita', 'Infografis', 'Publikasi', 'Verifikasi Data Prioritas', 'Foto/Video', 'Verifikasi All Data']),
            'is_active' => $this->faker->boolean,
        ];
    }
}