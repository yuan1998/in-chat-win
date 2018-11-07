<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
            'setting_id',
            'keyword',
            'message',
            'is_default'
    ];

    protected $casts = [
        'message' => 'json',
        'is_default' => 'boolean',
    ];


    public function setting ()
    {
        return $this->belongsTo(Settings::class , 'setting_id');
    }

}
