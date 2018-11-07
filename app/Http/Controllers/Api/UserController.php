<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UserRequest;
use App\User;

class UserController extends Controller
{

    public function store(UserRequest $request)
    {
        $data = $request->only(['name' , 'email' , 'password']);
        $data['uid'] = (string) \UUID::generate();

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        return $this->response->noContent()->setStatusCode(201);
    }
}
