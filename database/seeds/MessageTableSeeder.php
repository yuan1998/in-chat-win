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

        $faker = app(Faker\Generator::class);

        factory(\App\Message::class)
            ->times(20)
            ->make()
            ->each(function ($item) use ($ids , $faker) {
                $item->setting_id = $faker->randomElement($ids);
                \App\Message::create($item->toArray());
            });


    }
}
