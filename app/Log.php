<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = [
        'ip',
        'url',
        'time',
        'info',
        'type',
        'cookie',
        'data'
    ];

    protected $casts = [
        'data' => 'json',
        'info' => 'json',
    ];

}
