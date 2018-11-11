<?php
namespace App\Validations;

use App\Message;
use App\Settings;
use Illuminate\Validation\Validator;

class MessageValidator extends Validator
{
    public function validateMessageSetting($att , $value , $param)
    {
        $user = \Auth::guard('api')->user();
        $stg = Settings::find($value);

        return ($stg && $stg->user_id == $user->id );
    }

    public function validateKeywordNotExists($att , $value , $param) {
        $id = request()->get('id',null);
        if (!$id) {
            return false;
        }

        $item = Message::where('keyword' , $value)->where('id', '<>' , $id)->first();
        return !$item;
    }

}
