<?php

namespace App\Observers;

use App\Domian;

class DomainObserver
{

    public function saving(Domian $domian)
    {
        if (is_array($domian->tags)) {
            $domian->tags = implode('|', $domian->tags);
        }
    }

    public function creating(Domian $domian)
    {
        if (is_array($domian->tags)) {
            $domian->tags = implode('|', $domian->tags);
        }
    }

}
