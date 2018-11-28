<?php

namespace App\Transformers;

use App\Log;
use League\Fractal\TransformerAbstract;

class LogTransformer extends TransformerAbstract
{
    public function transform(Log $log)
    {
        return [
            'id'         => $log->id,
            'ip'         => $log->ip,
            'info'       => $log->info,
            'data'       => $log->data,
            'type'       => $log->type,
            'time'       => $log->time,
            'url'        => $log->url,
            'cookie'     => $log->cookie,
            'create_at'  => $log->created_at->toDateTimeString(),
            'updated_at' => $log->updated_at->toDateTimeString(),
        ];
    }

}
