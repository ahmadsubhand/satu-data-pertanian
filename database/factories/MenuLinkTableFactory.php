<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MenuLinkTable;

class MenuLinkTableFactory extends Factory
{
    protected $model = MenuLinkTable::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'link' => $this->faker->url,
            'nama' => $this->faker->company,
            'status' => $this->faker->randomElement([0, 1]),
            'foto' => $this->faker->word . '.png',
        ];
    }
}