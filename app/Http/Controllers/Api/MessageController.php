<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\MessageRequest;
use App\Message;
use App\Transformers\MessageTransformer;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function store(MessageRequest $request)
    {
        $user = $this->user();

        $data = $request->all();
        $data['user_id'] = $user->id;

        $item = Message::create($data);

        return $this->response->item($item , new MessageTransformer());
    }
}
