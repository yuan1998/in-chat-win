<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TemplateRequest;
use App\Settings;
use App\Template;
use App\Transformers\TemplateTransformer;
use Hamcrest\Core\Set;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    public function store ( TemplateRequest $request , Settings $settings)
    {
        $user = $this->user();
        if ($user->id !== $settings->user_id){
            return $this->response->errorUnauthorized();
        }

        $data =  $request->only(['template' , 'setting']);
        $data['setting_id'] = $settings->id;
        $data['user_id'] = $user->id;

        $template = Template::create($data);

        return $this->response->item($template , new TemplateTransformer())->setStatusCode(201);
    }

    public function update(TemplateRequest $request  , Settings $settings , Template $template)
    {
        $user = $this->user();
        if ($user->id !== $settings->user_id){
            return $this->response->errorUnauthorized();
        }
        $data =  $request->only(['template' , 'setting']);

        $template->fill($data);
        $template->save();

        return $this->response->item($template , new TemplateTransformer());
    }

    public function show ( Settings $settings , Template $template)
    {
        $user = $this->user();
        if ($user->id !== $template->user_id || $settings->id !== $template->setting_id){
            return $this->response->errorUnauthorized();
        }

        return $this->response->item($template , new TemplateTransformer());
    }

    public function one(Settings $settings)
    {
        $user = $this->user();
        if ($settings->user_id !== $user->id){
            return $this->response->errorUnauthorized();
        }

        $template = Template::where('setting_id' , $settings->id)->first();
        if (!$template) {
            $template = Template::create(['setting_id' => $settings->id , 'user_id' => $user->id , 'template' => [] , 'setting' => [] ]);
        }
        return $this->response->item($template , new TemplateTransformer());
    }

}
