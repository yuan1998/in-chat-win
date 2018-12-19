<?php

namespace App\Providers;

use App\Domian;
use App\Validations\MessageValidator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ini_set('memory_limit', '1024M');

        Domian::observe(\App\Observers\DomainObserver::class);


        $this->app->validator->resolver(function ( $translator , $data , $rules , $message , $attributes ) {
            return new MessageValidator($translator , $data , $rules , $message , $attributes );
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
