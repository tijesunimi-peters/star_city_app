<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\PasswordResetModel as PRM;

class PasswordConfirmed extends Event
{
    use SerializesModels;
    public $changed_pwd;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PRM $pwd)
    {
        $this->changed_pwd = $pwd;
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
