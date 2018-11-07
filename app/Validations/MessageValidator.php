<?php
namespace App\Validations;

use Illuminate\Validation\Validator;

class MessageValidator extends Validator
{
    public function validateMessageSetting($att , $value)
    {
        dd($att , $value);
    }

}
