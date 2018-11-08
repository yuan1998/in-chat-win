<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = app(Faker\Generator::class);

        $items =  factory(\App\User::class)
            ->times(6)
            ->make();


        \App\User::insert($items->makeVisible(['password', 'remember_token'])->toArray());

        $user = \App\User::find(1);
        $user->name = 'yuan1998';
        $user->email = 'chizhiyueshu@gmail.com';
        $user->save();
    }
}
