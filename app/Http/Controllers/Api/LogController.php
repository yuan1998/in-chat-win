<?php

namespace App\Http\Controllers\Api;

use App\Log;
use App\Transformers\LogTransformer;
use Illuminate\Http\Request;

class LogController extends Controller
{

    public function store(Request $request)
    {
        $data = $request->all();

        $data['ip']   = $request->ip();
        $data['info'] = geoip($data['ip'])->toArray();
        $data['url']  = $request->server('HTTP_REFERER');

        Log::create($data);
        return $this->response->noContent();
    }

    public function index(Request $request)
    {
        $items = Log::orderBy('created_at', 'desc')->paginate($request->get('paginate', 30));
        return $this->response->paginator($items, new LogTransformer());
    }

    public function destroy($ids)
    {
        $id = explode( ',' , $ids );
        Log::query()->whereIn('id' , $id)->delete();
        return $this->response->noContent();
    }

}
