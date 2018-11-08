<?php

use Faker\Generator as Faker;

$factory->define(\App\Domian::class, function (Faker $faker) {
    // 随机取一个月以内的时间
    $u_at = $faker->dateTimeThisMonth();
    // 传参为生成最大时间不超过，创建时间永远比更改时间要早
    $c_at = $faker->dateTimeThisMonth($u_at);

    return [
        'description' => $faker->sentence(),
        'open' => $faker->boolean(),
        'domain' => $faker->domainName,
        'created_at' => $c_at,
        'updated_at' => $u_at,
    ];
});
