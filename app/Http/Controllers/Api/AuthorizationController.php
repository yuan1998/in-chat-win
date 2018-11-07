<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\AuthorizationRequest;
use App\Transformers\UserTransformer;

class AuthorizationController extends Controller
{
    public function store (AuthorizationRequest $request)
    {

        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (!$token = \Auth::guard('api')->attempt($credentials)) {
            return $this->response->errorUnauthorized('用户名或密码错误');
        }

        $user = \Auth::guard('api')->user();
        return $this->response->item($user , new UserTransformer())
            ->setMeta(static::tokenArr($token))->setStatusCode(201);
    }

    public function index ()
    {
        $user = $this->user();

        $token = \Auth::guard('api')->refresh($user);

        return $this->response->item($user , new UserTransformer())
            ->setMeta(static::tokenArr($token));

    }

    public function update()
    {
        $token = \Auth::guard('api')->refresh();

        return $this->response->array(static::tokenArr($token));
    }


    public static function tokenArr($token)
    {
        return [
            'yuan_access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => \Auth::guard('api')->factory()->getTTL() * 60
        ];
    }

    public function destroy()
    {
        \Auth::guard('api')->logout();
        return $this->response->noContent();
    }
}
