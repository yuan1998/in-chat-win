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

$api->version('v1', [
    'namespace'  => 'App\Http\Controllers\Api',
    'middleware' => ["serializer:array", 'bindings'],

], function ($api) {

    $api->group([], function ($api) {


        /**
         * Auth
         *************************/
        $api->post('/auth', 'AuthorizationController@store')
            ->name('api.auth.store');


        /**
         * User
         *************************/
        $api->post('/user', 'UserController@store')
            ->name('api.user.store');
    });

    $api->group([
        'middleware' => 'api.auth'
    ], function ($api) {

        /**
         * Auth
         *************************/
        $api->get('/auth', 'AuthorizationController@index')
            ->name('api.auth.index');

        $api->get('/auth/current', 'AuthorizationController@update')
            ->name('api.auth.update');

        $api->delete('/auth/current', 'AuthorizationController@destroy')
            ->name('api.auth.destroy');

        /**
         * Setting
         ************************/
        $api->post('/setting', 'SettingController@store')
            ->name('api.setting.store');
        $api->get('/setting', 'SettingController@index')
            ->name('api.setting.index');
        $api->patch('/setting/{settings}', 'SettingController@update')
            ->name('api.setting.update');
        $api->get('/setting/{settings}', 'SettingController@show')
            ->name('api.setting.show');


        /**
         * Message
         ***********************/
        $api->post('/message', 'MessageController@store')
            ->name('api.message.store');
        $api->patch('/message/{message}', 'MessageController@update')
            ->name('api.message.update');
        $api->delete('/message/{ids}', 'MessageController@destroy')
            ->name('api.message.destroy');
        $api->get('/setting/{settings}/message', 'MessageController@index')
            ->name('api.message.index');
        $api->get('/setting/{settings}/message/{message}', 'MessageController@show')
            ->name('api.message.show');


        /**
         * Domain
         ***********************/
        $api->post('/domain', 'DomianController@store')
            ->name('api.domain.store');
        $api->patch('/domain/{domian}', 'DomianController@update')
            ->name('api.domain.update');
        $api->delete('/domain/{ids}', 'DomianController@destroy')
            ->name('api.domain.destroy');
        $api->get('/domain', 'DomianController@index')
            ->name('api.domain.index');
        $api->get('/domain/{domian}', 'DomianController@show')
            ->name('api.domain.show');

    });

});
