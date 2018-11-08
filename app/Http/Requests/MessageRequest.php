<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [];

        switch (request()->method()) {
            case "POST":
                $rules = [
                    'keyword'    => 'required|string|unique:messages,keyword',
                    'setting_id' => 'required|message-setting'
                ];
                break;
            case "PATCH":
                $rules = [
                    'keyword'    => 'string|unique:messages,keyword',
                ];
                break;
        }
        return $rules;
    }
}
