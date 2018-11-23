<?php

namespace App\Transformers;

use App\Template;
use League\Fractal\TransformerAbstract;

class TemplateTransformer extends TransformerAbstract
{
    public function transform(Template $template)
    {
        return [
            'id'         => $template->id,
            'setting'    => $template->setting,
            'template'   => $template->template,
            'create_at'  => $template->created_at->toDateTimeString(),
            'updated_at' => $template->updated_at->toDateTimeString(),
        ];
    }

}
