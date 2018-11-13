<?php

namespace App\Validations;

use App\Domian;
use App\Message;
use App\Settings;
use Illuminate\Validation\Validator;

class MessageValidator extends Validator
{
    public function validateMessageSetting($att, $value, $param)
    {
        $user = \Auth::guard('api')->user();
        $stg  = Settings::find($value);

        return ($stg && $stg->user_id == $user->id);
    }

    public function validateKeywordNotExistsUpdate($att, $value, $param)
    {
        $id   = request()->get('id', null);
        $user = \Auth::guard('api')->user();

        if (!$id || !$user) {
            return false;
        }

        $item = Message::where('keyword', $value)->where('user_id', $user->id)->where('id', '<>', $id)->first();
        return !$item;
    }

    public function validateKeywordNotExists($att, $value, $param)
    {
        $user = \Auth::guard('api')->user();

        if (!$user)

            return false;

        $item = Message::where('keyword', $value)->where('user_id', $user->id)->first();
        return !$item;
    }


    public function validateDomainNotExists($att, $value, $param)
    {
        $user = \Auth::guard('api')->user();

        if (!$user)
            return false;

        $item = Domian::where('domain', $value)->where('user_id', $user->id)->first();
        return !$item;
    }

    public function validateDomainNotExistsUpdate($att, $value, $param)
    {
        $id   = request()->get('id', null);
        $user = \Auth::guard('api')->user();

        if (!$id || !$user) {
            return false;
        }

        $item = Domian::where('domain', $value)->where('user_id', $user->id)->where('id', '<>', $id)->first();
        return !$item;
    }

}
