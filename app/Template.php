<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'user_id',
        'setting_id',
        'template',
        'setting'
    ];

    protected $casts = [
        'template' => 'json',
        'setting' => 'json',
    ];


    public function user () {
        return $this->belongsTo(User::class);
    }

}
