<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Classes\AuditionLogics;
use JWTAuth;

class AuditionProvider extends ServiceProvider
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
        $this->app->bind('\App\Classes\AuditionLogics', function($app) {
            return new AuditionLogics(JWTAuth::parseToken()->authenticate());
        });
    }
}
