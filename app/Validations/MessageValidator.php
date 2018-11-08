<?php
namespace App\Validations;

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

}
