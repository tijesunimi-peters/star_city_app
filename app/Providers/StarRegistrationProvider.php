<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\User;
use App\Stars;

class StarRegistrationProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Stars::saved(function() {
            
        })
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
