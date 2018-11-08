<?php

use Illuminate\Database\Seeder;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $users = \App\User::all()->pluck('id')->toArray();

        $faker = app(Faker\Generator::class);

        factory(\App\Settings::class)
            ->times(3)
            ->make()
            ->each(function ($setting) use ($faker , $users) {
                $setting->user_id = $faker->randomElement($users);
                \App\Settings::create($setting->toArray());
            });
    }
}
