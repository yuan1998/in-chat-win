<?php

namespace App\Transformers;

use App\Domian;
use League\Fractal\TransformerAbstract;

class DomianTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'user',
        'setting'
    ];

    public function transform(Domian $domian)
    {
        return [
            'id'          => (int) $domian->id,
            'description' => (string) $domian->description,
            'setting_id'  => (int) $domian->setting_id,
            'user_id'     => (int) $domian->user_id,
            'domain'      => (string) $domian->domain,
            'open'        => (boolean) $domian->open,
            'tags'        => !!$domian->tags ? explode('|', $domian->tags) : [],
            'create_at'   => $domian->created_at->toDateTimeString(),
            'updated_at'  => $domian->updated_at->toDateTimeString(),
        ];
    }

    public function includeUser ($item)
    {
        return $this->item($item->user , new UserTransformer() );
    }

    public function includeSetting ( $item)
    {
        return $this->item($item->setting , new SettingTransformer());
    }

}
