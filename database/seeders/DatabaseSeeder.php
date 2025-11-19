<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\MenuInfografisTableSeeder;
use Database\Seeders\MenuPublikasiTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserRoleSeeder::class,
            UserMenuSeeder::class,
            UserMenuUserRoleSeeder::class,
            ProdusenDataTableSeeder::class,
            KategoriDataTableSeeder::class,
            UserSeeder::class,
            MenuMetadataTableSeeder::class,
            MenuBeritaTableSeeder::class,
            MenuInfografisTableSeeder::class,
            MenuPublikasiTableSeeder::class
        ]);

        // User::factory(10)->create();
        User::factory()->create([
            'email' => 'contoh@test.com',
            'nama_lengkap' => 'Test User',
            'username' => 'test_user',
            'password' => '12341234',
            'email_verified_at' => now(),
            'user_role_id' => 1,
            'eselon' =>  1,
        ]);
    }
}
