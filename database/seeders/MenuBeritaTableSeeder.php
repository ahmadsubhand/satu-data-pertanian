<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MenuBeritaTable;

class MenuBeritaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Example seed data - you can customize this as needed
        MenuBeritaTable::factory()->count(10)->create();
    }
}