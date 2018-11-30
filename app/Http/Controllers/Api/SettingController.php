<?php

namespace App\Http\Controllers\Api;

use App\Domian;
use App\Http\Requests\SettingRequest;
use App\Message;
use App\Template;
use Illuminate\Http\Request;
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

        return $this->response->item($item , new SettingTransformer());
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
        return $this->response->item( $settings , new SettingTransformer());
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
            ->get();

        return $this->response->collection( $items , new SettingTransformer());
    }

    public function show(Settings $settings)
    {
        $user = $this->user();
        if ($user->id !== $settings->user_id){
            return $this->response->errorUnauthorized();
        }
        return $this->response->item($settings , new SettingTransformer());
    }

    public function indexName()
    {
        $user = $this->user();

        $items = Settings::where('user_id' , $user->id)
            ->select(['id','name','user_id','description' ,'created_at' ,'updated_at'])->get();

        return $this->response->collection($items , new SettingTransformer('list'));
    }

    public static function filterZt($type , $list , $zt)
    {
        $in = in_array($zt , $list);

        return $type=== 'white' ? $in : !$in;
    }

    public function pageGetSetting(Request $request) {
        $id = $request->get('i');
        $url = $request->get('u');
        $keyword = $request->get('kw');
        $ztName = $request->get('zt');

        $r = Domian::with('setting')->where('open',true)->where('user_id' , $id)->where('domain' , $url)->first();

        if (!$r) {
            return $this->response->errorBadRequest('找不到该域名');
        }

        $setting = $r->setting;

        if ($setting['list-open'] && !self::filterZt($setting['list-model'] , $setting['list-data'] , $ztName)) {
            return $this->response->errorBadRequest('被禁止的专题');
        }

        $setting_id = $setting->id;
        $default_id = $setting->default_message;
        $default = null;

        $list = Message::where('user_id' , $id)
            ->where('setting_id' , $setting_id)
            ->get()
            ->each(function ($item) use (&$default , $default_id , $keyword) {
                // 我需要用数字库里的一个字段来匹配前端传上来的字符串
                // $item->keyword  = 数据库里用来匹配的关键字
                // $keyword = 前端传上来的字符串
                // 我现在是把所有的数据拉出来遍历,然后一个个匹配.
                // 我想知道在数据库里有没有直接 sql 语句操作

                if ($item->id === $default_id) {
                    $default = $item;
                }

                // 假设 $item->keyword = 'test'
                // 这里 把$item->keyword 变成 (t).*(e).*(s).*(t).*
                // 然后用 (t).*(e).*(s).*(t).* 去匹配前端的字符串
                $reg = preg_replace('/(.)/' , '($1).*' , $item->keyword);
                preg_match("/$reg/" , $keyword , $results);

                // 用匹配到了多少个字符来确定相关度.
                $item->keyword_count = count($results);
                if ( strrpos(strtolower($keyword) , strtolower($item->keyword)) !== false ) {
                    $item->keyword_count += 2;
                }
            });

        $list->sortByDesc('keyword_count');

        $r = $list->last();

        if ($r->keyword_count === 0 ) {
            if ($default) {
                $r = $default;
            }else {
                return $this->response->errorBadRequest('Not Message.');
            }
        }
        $template = Template::where('setting_id' , $setting->id)->first();
        if ($template) {
            $r->template = $template->template ?: null;
//            $r->setting = $template->setting ?: null;
        }

        return $this->response->array($r->toArray());
    }

}
