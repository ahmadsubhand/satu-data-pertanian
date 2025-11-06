<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\KategoriDataTable;

class KategoriDataTableFactory extends Factory
{
    protected $model = KategoriDataTable::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'value' => $this->faker->randomElement(['Terbuka', 'Tertutup', 'Terbatas']),
        ];
    }
}