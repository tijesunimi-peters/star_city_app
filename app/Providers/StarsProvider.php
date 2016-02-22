<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Auth\UserProvider;
use App\StarsModel;
use Auth;

class StarsProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
       Auth::provider('stars', function($app, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\UserProvider...
            return new UserProvider($app['stars']);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        // $this->app->bind('App\StarsModel', function($app) {
        //     return new UserProvider($app['stars']);
        // });
    }
}
