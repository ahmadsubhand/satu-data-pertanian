<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserRole;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['role' => 'Superadmin'],
            ['role' => 'Walidata'],
            ['role' => 'Admin Pusdatin'],
            ['role' => 'Pembina Data'],
            ['role' => 'Produsen Data'],
        ];

        foreach ($roles as $role) {
            UserRole::firstOrCreate($role);
        }
    }
}