<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\SettingRequest;
use App\Settings;
use App\Transformers\SettingTransformer;

class SettingController extends Controller
{

    public function store(SettingRequest $request)
    {
        $user = $this->user();

        $data = $request->all();
        $data['user_id'] = $user->id;
        $item = Settings::create($data);

        return $this->response->item($item , new SettingTransformer())->setStatusCode(201);
    }

    public function update(SettingRequest $request, Settings $settings)
    {
        $user = $this->user();

        if ($user->id != $settings->user_id){
            return $this->response->errorUnauthorized();
        }

        $data = $request->all();

        $settings->fill($data);
        $settings->save();
        return $this->response->item( $settings , new SettingTransformer())->setStatusCode(201);
    }

    public function destroy($ids)
    {
        $user = $this->user();

        Settings::where('user_id' , $user->id)
            ->whereIn('id', explode(',' , $ids))
            ->delete();

        return $this->response->noContent();
    }

    public function index()
    {
        $user = $this->user();

        $items = Settings::where('user_id' , $user->id)
            ->paginate(request()->get('paginate' , 20));

        return $this->response->paginator( $items , new SettingTransformer('list'));
    }

    public function show(Settings $settings)
    {
        $user = $this->user();
        if ($user->id !== $settings->user_id){
            return $this->response->errorUnauthorized();
        }
        return $this->response->item($settings , new SettingTransformer());
    }

}
