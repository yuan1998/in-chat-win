<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'type',
        'list-model',
        'list-open',
        'list-data',
        'setting',
        'default_message'
    ];

    protected $casts = [
        'setting' => 'json',
        'list-open' => 'boolean',
        'list-data' => 'json'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function message()
    {
        return $this->belongsTo(Message::class,'default_message' , 'id');
    }

}
