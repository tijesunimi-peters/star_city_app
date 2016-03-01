<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use \Validator;
use App\StarsModel;
use \Auth;
// use Illuminate\Auth\SessionGuard as G;
// use Illuminate\Support\Facades\Auth as A;
// use Sarav\Multiauth\MultiauthServiceProvider as S;

class LoginController extends Controller
{

	 public function __construct()
    {
        // $this->user = "stars";
        // $this->middleware('stars');
    }


    Public function getIndex() {
    	return response('Bad Request',200);
    }


    Public function postStarsLogin(Request $request) {
       
            $rules = [
                'email'=>'email|required|exists:users,email',
                'password'=>'required'

                ];

            $input = ['email'=>$request->input('email'),'password'=>$request->input('password')];

            $v = Validator::make($input,$rules);

            if($v->fails()){
                return response()->json($v->messages());
            }


            if(!Auth::once($input)) {
                return response()->json(['error'=>"Email and Password combination Incorrect"]);
            }


            if(!Auth::user()->star) {
                return response()->json(['error'=>"You are not registered as a star"]);
            } 

            return response()->json(Auth::user());


       
    	
    }

    Public function postStarMakersLogin() {
    	
    }

}
