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
        $ids =  \App\Settings::all()->toArray();

        $faker = app(Faker\Generator::class);

        factory(\App\Domian::class)
            ->times(30)
            ->make()
            ->each(function ($item) use ( $ids , $faker) {
                $set = $faker->randomElement($ids);
                $item->setting_id = $set['id'];
                $item->user_id = $set['user_id'];

                \App\Domian::create($item->toArray());
            });
    }
}
