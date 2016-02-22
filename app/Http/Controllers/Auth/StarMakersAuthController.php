<?php
 
namespace App\Http\Controllers\Auth;
 
use App\StarMakersModel;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Sarav\Multiauth\Foundation\AuthenticatesAndRegistersUsers;
 
class StarMakersAuthController extends Controller
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;
 
    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->user = "star_makers";
        $this->middleware('star_makers.guest', ['except' => 'getLogout']);
    }
}