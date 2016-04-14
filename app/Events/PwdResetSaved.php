<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\PasswordResetModel as PRM;

class PwdResetSaved extends Event
{
    use SerializesModels;

    public $pwd_reset;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PRM $pwd_reset)
    {
        $this->pwd_reset = $pwd_reset;
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
