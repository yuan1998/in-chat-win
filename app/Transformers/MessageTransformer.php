<?php

namespace App\Transformers;

use App\Message;
use League\Fractal\TransformerAbstract;

class MessageTransformer extends TransformerAbstract
{
    public function transform(Message $message)
    {
        return [
            'id' => $message->id,
            'keyword' => $message->keyword,
            'setting_id' => $message->setting_id,
            'is_default' => $message->is_default,
            'message' => $message->message,
            'create_at' => $message->created_at->toDateTimeString(),
            'updated_at' => $message->updated_at->toDateTimeString(),
        ];
    }

}
