<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MenuPublikasiTable;

class MenuPublikasiTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Example seed data - you can customize this as needed
        MenuPublikasiTable::factory()->count(10)->create();
    }
}