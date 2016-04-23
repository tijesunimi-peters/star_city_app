<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Audition;

class AuditionDeleted extends Event
{
    use SerializesModels;

    public $audition;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Audition $audition)
    {
        $this->audition = $audition;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
