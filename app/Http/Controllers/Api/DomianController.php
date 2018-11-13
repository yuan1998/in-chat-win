<?php

namespace App\Http\Controllers\Api;

use App\Domian;
use App\Http\Requests\DomianRequest;
use App\Settings;
use App\Transformers\DomianTransformer;
use Illuminate\Http\Request;

class DomianController extends Controller
{


    public function store(DomianRequest $request)
    {
        $user = $this->user();
        if (!$user) {
            return $this->response->errorUnauthorized();
        }

        $data = $request->all();

        $data['user_id'] = $user->id;

        $item = Domian::create($data);

        return $this->response->item($item , new DomianTransformer());
    }

    public function update(DomianRequest $request , Domian $domian)
    {
        $user = $this->user();

        if($user->id != $domian->user_id)
        {
            return $this->response->errorUnauthorized();
        }

        $data = $request->all();

        $domian->fill($data);
        $domian->save();

        return $this->response->item($domian , new DomianTransformer());
    }

    public function destroy($ids)
    {
        $user = $this->user();

        Domian::where('user_id', $user->id)
            ->whereIn('id' , explode(',' , $ids))
            ->delete();

        return $this->response->noContent();
    }


    public function index(DomianRequest $request)
    {
        $user = $this->user();

        $items = Domian::where('user_id' , $user->id)
            ->get();

        return $this->response->collection($items , new DomianTransformer());
    }

    public function show(Domian $domian)
    {
        $user = $this->user();

        if ($user->id != $domian->user_id){
            return $this->response->errorUnauthorized();
        }

        return $this->response->item($domian , new DomianTransformer());
    }

    public function settingIndex (Settings $settings , Domian $domian) {
        $user = $this->user();

        if ( !($domian->user_id == $user->id && $domian->setting_id == $settings->id) ) {
            return $this->response->errorUnauthorized();
        }

        return $this->response->item($domian , new DomianTransformer());
    }
}
