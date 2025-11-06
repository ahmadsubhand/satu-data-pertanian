<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UserMenuUserRole;

class UserMenuUserRoleFactory extends Factory
{
    protected $model = UserMenuUserRole::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_role_id' => \App\Models\UserRole::factory(),
            'user_menu_id' => \App\Models\UserMenu::factory(),
        ];
    }
}