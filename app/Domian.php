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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setting()
    {
        return $this->belongsTo(Settings::class , 'setting_id');
    }

}
