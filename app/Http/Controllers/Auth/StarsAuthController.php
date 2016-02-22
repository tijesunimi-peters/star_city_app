<?php
 
namespace App\Http\Controllers\Auth;
 
use App\StarsModel;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Sarav\Multiauth\Foundation\AuthenticatesAndRegistersUsers;
 
class StarsAuthController extends Controller
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;
 
    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->user = "stars";
        $this->middleware('stars.guest', ['except' => 'getLogout']);
    }
}