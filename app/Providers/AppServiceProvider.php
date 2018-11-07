<?php

namespace App\Providers;

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


        Validator::resolver(function ( $translator , $data , $rules , $message , $attributes ) {
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
