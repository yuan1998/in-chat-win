<?php

namespace App\Transformers;

use App\Settings;
use League\Fractal\TransformerAbstract;

class SettingTransformer extends TransformerAbstract
{

    protected $availableIncludes = ['user', 'message'];

    public $type;

    public function __construct($type = 'default')
    {
        $this->type = $type;
    }

    public function transform(Settings $setting)
    {
        $transformer = [
            'id'              => (int)$setting->id,
            'user_id'         => (int)$setting->user_id,
            'type'            => (string)$setting->type,
            'name'            => (string)$setting->name,
            'description'     => (string)$setting->description,
            'default_message' => (int)$setting->default_message,
            'setting'         => $setting->setting,
            'list-model'      => $setting['list-model'],
            'list-open'       => $setting['list-open'],
            'list-data'       => $setting['list-data'],
            'create_at'       => $setting->created_at->toDateTimeString(),
            'updated_at'      => $setting->updated_at->toDateTimeString(),
        ];

        switch($this->type)
        {
            case "list":
                $transformer = [
                    'id'              => (int)$setting->id,
                    'user_id'         => (int)$setting->user_id,
                    'create_at'       => $setting->created_at->toDateTimeString(),
                    'updated_at'      => $setting->updated_at->toDateTimeString(),
                    'name'            => (string)$setting->name,
                    'description'     => (string)$setting->description,
                ];
                break;
        }

        return $transformer;
    }

    public function includeUser($setting)
    {
        return $this->item($setting->user, new UserTransformer());
    }

    public function includeMessage($setting)
    {
        return $this->item($setting->message, new MessageTransformer());
    }


}
