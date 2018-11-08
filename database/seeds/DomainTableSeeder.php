<?php

use Illuminate\Database\Seeder;

class DomainTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ids =  \App\Settings::all()->pluck('id')->toArray();
        $users = \App\User::all()->pluck('id')->toArray();

        $faker = app(Faker\Generator::class);

        factory(\App\Domian::class)
            ->times(30)
            ->make()
            ->each(function ($item) use ($users , $ids , $faker) {
                $item->user_id = $faker->randomElement($users);
                $item->setting_id = $faker->randomElement($ids);
                \App\Domian::create($item->toArray());
            });
    }
}
