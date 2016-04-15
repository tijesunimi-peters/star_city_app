<?php

namespace App\Listeners;

use App\Events\PasswordConfirmed;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\User;
use JWTAuth;

class PwdConfirmedListener implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  PasswordConfirmed  $event
     * @return void
     */
    public function handle(PasswordConfirmed $event)
    {
        
        $user = User::find($event->changed_pwd->user_id);
        $user->password = $event->changed_pwd->token;
        $user->save();
        $event->changed_pwd->delete();
    }
}
