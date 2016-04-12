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
        User::saved(function($user) {
            \Session::put('newUserId', $user->id);
        });

        Star::creating(function($star) {
            $star->user_id = \Session::get('newUserId');
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
