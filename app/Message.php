<?php

namespace App;

use Fukuball\Jieba\Finalseg;
use Fukuball\Jieba\Jieba;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

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

        $jieba = Redis::connection('jieba');

        $messages->each(function ($item) use ($jieba) {
            $item->kw_arr = $jieba->executeRaw(['cut', $item->keyword, 0]);
            $item->save();
        });
        return true;
    }

}
