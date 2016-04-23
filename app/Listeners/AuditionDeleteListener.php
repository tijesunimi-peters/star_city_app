<?php

namespace App\Listeners;

use App\Events\AuditionDeleted;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class AuditionDeleteListener
{
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
     * @param  AuditionDeleted  $event
     * @return void
     */
    public function handle(AuditionDeleted $event)
    {
        $event->audition->auditionApplications()->delete();
    }
}
