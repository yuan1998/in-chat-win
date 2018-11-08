<?php

use Illuminate\Database\Seeder;

class MessageTableSeeder extends Seeder
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

        factory(\App\Message::class)
            ->times(20)
            ->make()
            ->each(function ($item) use ($ids , $users , $faker) {
                $item->setting_id = $faker->randomElement($ids);
                $item->user_id = $faker->randomElement($users);
                \App\Message::create($item->toArray());
            });


    }
}
