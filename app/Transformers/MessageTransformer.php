<?php

namespace App\Transformers;

use App\Message;
use League\Fractal\TransformerAbstract;

class MessageTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'user',
        'setting'
    ];

    public function transform(Message $message)
    {
        return [
            'id'         => (int) $message->id,
            'keyword'    => (string) $message->keyword,
            'setting_id' => (int) $message->setting_id,
            'is_default' => (boolean) $message->is_default,
            'message'    => $message->message,
            'create_at'  => $message->created_at->toDateTimeString(),
            'updated_at' => $message->updated_at->toDateTimeString(),
        ];
    }

    public function includeUser($item)
    {
        return $this->item($item->user, new UserTransformer());
    }

    public function includeSetting($item)
    {
        return $this->item($item->setting, new SettingTransformer());
    }


}
