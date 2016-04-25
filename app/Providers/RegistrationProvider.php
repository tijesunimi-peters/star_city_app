<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RegistrationProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('\App\Classes\RegistrationLogics', function() {
            return new \App\Classes\RegistrationLogics;
        });
    }
}
