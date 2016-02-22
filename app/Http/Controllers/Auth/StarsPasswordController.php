<?php
 
namespace App\Http\Controllers\Auth;
 
use App\Http\Controllers\Controller;
use Sarav\Multiauth\Foundation\ResetsPasswords;
 
class StarsPasswordController extends Controller
{
    use ResetsPasswords;
 
    /**
     * Create a new password controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->user = "stars";
        $this->middleware('stars.guest');
    }
}