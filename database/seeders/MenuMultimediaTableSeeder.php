<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MenuMultimediaTable;

class MenuMultimediaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Example seed data - you can customize this as needed
        MenuMultimediaTable::factory()->count(10)->create();
    }
}