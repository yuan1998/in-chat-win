<?php

namespace App\Http\Controllers\Api;

use App\Log;
use Illuminate\Http\Request;

class LogConroller extends Controller
{

    public function store (Request $request)
    {
        $data = $request->all();

        $data['ip'] = $request->ip();
        $data['url'] = $request->server('HTTP_REFERER');

        Log::create($data);

        return $this->response->noContent();
    }
}
