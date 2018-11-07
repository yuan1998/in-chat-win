<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
$api = app('Dingo\Api\Routing\Router');

$api->version('v1' , [
    'namespace' => 'App\Http\Controllers\Api',
    'middleware' => ["serializer:array",'bindings'],

] , function ($api) {

    $api->group([],function ($api) {


        /**
         * Auth
         *************************/
        $api->post('/auth','AuthorizationController@store')
            ->name('api.auth.store');



        /**
         * User
         *************************/
        $api->post('/user','UserController@store')
            ->name('api.user.store');
    });

    $api->group([
        'middleware' => 'api.throttle'
        ],function ($api) {

        /**
         * Auth
         *************************/
        $api->get('/auth','AuthorizationController@index')
            ->name('api.auth.index');

        $api->get('/auth/current' , 'AuthorizationController@update')
            ->name('api.auth.update');

        $api->delete('/auth/current' , 'AuthorizationController@destroy')
            ->name('api.auth.destroy');

        /**
         * Setting
         ************************/
        $api->post('/setting', 'SettingController@store')
            ->name('api.setting.store');

    });

});
