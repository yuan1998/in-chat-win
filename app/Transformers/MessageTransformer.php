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
            'create_at' => $message->created_at->toDateTimeString(),
            'updated_at' => $message->updated_at->toDateTimeString(),
        ];
    }

}
