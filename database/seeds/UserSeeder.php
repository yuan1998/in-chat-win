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
        $data = [
            'email' => 'chizhiyueshu@gmail.com',
            'password' => bcrypt('3322123'),
            'name' => 'yuan1998',
            'uid' => (string) \UUID::generate()
        ];

        \App\User::create($data);
    }
}
