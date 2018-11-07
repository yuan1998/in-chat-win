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

        $faker = app(Faker\Generator::class);

        factory(\App\Settings::class)
            ->times(3)
            ->make()
            ->each(function ($setting) use ($faker) {
                $setting->user_id = 1;
                \App\Settings::create($setting->toArray());
            });
    }
}
