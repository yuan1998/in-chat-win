<?php

namespace App\Http\Controllers\Api;

use App\Domian;
use App\Http\Requests\MessageRequest;
use App\Message;
use App\Settings;
use App\Template;
use App\Transformers\MessageTransformer;
use Fukuball\Jieba\Finalseg;
use Fukuball\Jieba\Jieba;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function store(MessageRequest $request)
    {
        $user = $this->user();

        $data            = $request->all();
        $data['user_id'] = $user->id;

        Jieba::init();
        Finalseg::init();
        $data['kw_arr'] = Jieba::cut($request->get('keyword', ''));

        $item = Message::create($data);

        return $this->response->item($item, new MessageTransformer());
    }

    public function update(MessageRequest $request, Message $message)
    {
        $user = $this->user();

        if ($user->id != $message->user_id) {
            return $this->response->errorUnauthorized();
        }
        $data = $request->all();

        if ($request->get('keyword', null) !== $message->keyword) {
            Jieba::init();
            Finalseg::init();

            $data['kw_arr'] = Jieba::cut($request->get('keyword', ''));
        }

        $message->fill($data);
        $message->save();

        return $this->response->item($message, new MessageTransformer());
    }

    public function destroy($ids)
    {
        $user = $this->user();

        Message::where('user_id', $user->id)
            ->whereIn('id', explode(',', $ids))
            ->delete();

        return $this->response->noContent();
    }

    public function index(MessageRequest $request, Settings $settings)
    {
        $user = $this->user();

        if ($settings->user_id != $user->id) {
            return $this->response->errorUnauthorized();
        }

        $items = Message::where('user_id', $user->id)
            ->where('setting_id', $settings->id)->get();

        return $this->response->collection($items, new MessageTransformer());
    }

    public function show(Settings $settings, Message $message)
    {
        $user = $this->user();

        if (!($message->user_id == $user->id && $message->setting_id == $settings->id)) {
            return $this->response->errorUnauthorized();
        }

        return $this->response->item($message, new MessageTransformer());
    }

    public function one(Message $message)
    {
        return $this->response->item($message, new MessageTransformer());
    }

    public static function searchOf($json, $userId, $settingId, $defaultId = false)
    {
        $item = Message::query()
            ->where('user_id', $userId)
            ->where('setting_id', $settingId)
            ->whereRaw("JSON_CONTAINS('{$json}' , kw_arr) = 1")->orderBy('weight', 'desc')
            ->first();

        if ($item) {
            return $item;
        }

        if ($defaultId) {
            return Message::find($defaultId);
        }

        return false;
    }

    public function searchMessage(Request $request)
    {
        $id      = $request->get('i');
        $url     = $request->get('u');
        $keyword = $request->get('kw');
        $ztName  = $request->get('zt');

        $r = Domian::with('setting')->where('open', true)->where('user_id', $id)->where('domain', $url)->first();

        if (!$r) {
            return $this->response->errorBadRequest('找不到该域名');
        }

        $setting = $r->setting;

        if ($setting['list-open'] && !SettingController::filterZt($setting['list-model'], $setting['list-data'], $ztName)) {
            return $this->response->errorBadRequest('被禁止的专题');
        }

        $setting_id = $setting->id;
        $default_id = $setting->default_message;
        logger('memory_limit is :' . ini_get('memory_limit'));
        Jieba::init();
        Finalseg::init();

        $kwArr  = json_encode(Jieba::cut($keyword), JSON_UNESCAPED_UNICODE);
        $result = self::searchOf($kwArr, $id, $setting_id, $default_id);

        if (!$result) {
            return $this->response->errorBadRequest('没有对应的信息.');
        }

        if (!$request->has('notTemplate')) {
            $template = Template::where('setting_id', $setting->id)->first();

            if (!$template) {
                return $this->response->errorBadRequest('没有对应窗口样式.');
            }

            $result->template = $template->template;
        }

        return $this->response->array($result->toArray());
    }

}
