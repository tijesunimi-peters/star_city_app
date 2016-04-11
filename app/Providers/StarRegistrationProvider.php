<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\User;
use App\Star;

class StarRegistrationProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Star::creating(function($star) {
            $star->star_id = mt_rand(1000,9999);
        });


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
