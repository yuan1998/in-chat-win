<?php

namespace App;

use Fukuball\Jieba\Finalseg;
use Fukuball\Jieba\Jieba;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'setting_id',
        'keyword',
        'message',
        'is_default',
        'user_id',
        'kw_arr',
        'business',
        'weight',
    ];

    protected $casts = [
        'message'    => 'json',
        'kw_arr'     => 'json',
        'is_default' => 'boolean',
    ];

    /**
     * @override
     * @param mixed $value
     * @return string
     */
    protected function asJson($value)
    {
        return json_encode($value, JSON_UNESCAPED_UNICODE);
    }

    public function setting()
    {
        return $this->belongsTo(Settings::class, 'setting_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function fixKeywordArray()
    {
        $messages = Message::all();

        Jieba::init();
        Finalseg::init();

        $messages->each(function ($item) {
            $item->kw_arr = Jieba::cut($item->keyword);
            $item->save();
        });
        return true;
    }

    /*
     2018-12-18 11:06:38:推送返回不为ok，判定为推送失败，返回值：
    {"message":"404 Not Found",
    "status_code":404,
    "debug":{"line":179,"file":"D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Routing\\RouteCollection.php","class":"Symfony\\Component\\HttpKernel\\Exception\\NotFoundHttpException","trace":[
    "#0 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Routing\\Router.php(612): Illuminate\\Routing\\RouteCollection->match(Object(Dingo\\Api\\Http\\Request))",
    "#1 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Routing\\Router.php(601): Illuminate\\Routing\\Router->findRoute(Object(Dingo\\Api\\Http\\Request))",
    "#2 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Routing\\Router.php(590): Illuminate\\Routing\\Router->dispatchToRoute(Object(Dingo\\Api\\Http\\Request))",
    "#3 D:\\vroot\\visitor-message\\vendor\\dingo\\api\\src\\Routing\\Adapter\\Laravel.php(81): Illuminate\\Routing\\Router->dispatch(Object(Dingo\\Api\\Http\\Request))",
    "#4 D:\\vroot\\visitor-message\\vendor\\dingo\\api\\src\\Routing\\Router.php(512): Dingo\\Api\\Routing\\Adapter\\Laravel->dispatch(Object(Dingo\\Api\\Http\\Request), 'v1')","#5 D:\\vroot\\visitor-message\\vendor\\dingo\\api\\src\\Http\\Middleware\\Request.php(126): Dingo\\Api\\Routing\\Router->dispatch(Object(Dingo\\Api\\Http\\Request))","#6 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(114): Dingo\\Api\\Http\\Middleware\\Request->Dingo\\Api\\Http\\Middleware\\{closure}(Object(Dingo\\Api\\Http\\Request))","#7 D:\\vroot\\visitor-message\\vendor\\fideloper\\proxy\\src\\TrustProxies.php(56): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#8 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(149): Fideloper\\Proxy\\TrustProxies->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#9 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest.php(30): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#10 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(149): Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#11 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest.php(30): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#12 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(149): Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#13 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize.php(27): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#14 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(149): Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#15 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode.php(46): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#16 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(149): Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#17 D:\\vroot\\visitor-message\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(102): Illuminate\\Pipeline\\Pipeline->Illu
     */
}
