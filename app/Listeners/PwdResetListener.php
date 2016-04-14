<?php

namespace App\Listeners;

use App\Events\PwdResetSaved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Mail;

class PwdResetListener implements ShouldQueue
{
    use InteractsWithQueue;
    public $mailer;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(Mail $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * Handle the event.
     *
     * @param  PwdResetSaved  $event
     * @return void
     */
    public function handle(PwdResetSaved $event)
    {
        $pwd = $event->pwd_reset;
        Mail::queue('emails.password_reset', ['pwd'=>$pwd], function($m) use ($pwd) {
            $m->from('noreply@app.com', 'Password Reset');

            $m->to($pwd->email, $pwd->name)->subject('Confirm Password Reset');
        });
    }
}
