<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = [
        'ip',
        'url',
        'type',
        'cookie',
        'data'
    ];

    protected $casts = [
        'data'=> 'json'
    ];

}
