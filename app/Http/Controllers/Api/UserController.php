<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UserRequest;
use App\Transformers\UserTransformer;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function store(UserRequest $request)
    {
        $data = $request->only(['name' , 'email' , 'password']);
        $data['uid'] = (string) \UUID::generate();

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        $token = \Auth::guard('api')->fromUser($user);
        return $this->response->item($user , new UserTransformer())
            ->setMeta(AuthorizationController::tokenArr($token))
            ->setStatusCode(201);
    }

    public function repassword(Request $request)
    {
        $user = $this->user();
        $password = $request->password;
        $newPassword = $request->newPassword;

        if ($user->password  !== bcrypt($password)) {
            return $this->response->errorBadRequest('password error');
        }
        $user->password = bcrypt($newPassword);
        $user->save();

        return $this->response->noContent()->setStatusCode(201);
    }
}
