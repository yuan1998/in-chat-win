<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
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

        switch(request()->method())
        {
            case "POST":
                $rules = [
                    'name' => 'required|string',
                    'setting' => 'required',
                    'list-model' => 'required|in:white,black'
                ];
                break;
        }

        return $rules;
    }
}
