<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Domian extends Model
{
    protected $fillable = [
        'setting_id',
        'description',
        'domain',
        'open',
        'tags',
        'user_id',
    ];

    protected $casts = [
        'open' => 'boolean'
    ];

}
