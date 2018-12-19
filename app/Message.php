<?php

namespace App;

use Fukuball\Jieba\Finalseg;
use Fukuball\Jieba\Jieba;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'setting_id',
        'keyword',
        'message',
        'is_default',
        'user_id',
        'kw_arr',
        'business',
        'weight',
    ];

    protected $casts = [
        'message'    => 'json',
        'kw_arr'     => 'json',
        'is_default' => 'boolean',
    ];

    /**
     * @override
     * @param mixed $value
     * @return string
     */
    protected function asJson($value)
    {
        return json_encode($value, JSON_UNESCAPED_UNICODE);
    }

    public function setting()
    {
        return $this->belongsTo(Settings::class, 'setting_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function fixKeywordArray()
    {
        $messages = Message::all();

        Jieba::init();
        Finalseg::init();

        $messages->each(function ($item) {
            $item->kw_arr = json_encode(Jieba::cut($item->keyword), JSON_UNESCAPED_UNICODE);
            $item->save();
        });
        return true;
    }

}
