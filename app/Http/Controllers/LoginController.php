<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\UsersLoginRequest as ULR;
use App\Http\Controllers\Controller;
use \Validator;
use App\User;
use App\StarsModel;
use Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{

    Public function getIndex() {
    	return response('Bad Request',200);
    }


    Public function postStarsLogin(ULR $request) {

            $input = ['email'=>$request->email,'password'=>$request->password];


            try {

                if(!$token = JWTAuth::attempt($input)) {
                return response()->json(['code'=>'error','response'=>"Email and Password combination Incorrect"]);
                }
            } catch(JWTException $e) {
                return response()->json(['code'=>'error','response' => 'could_not_create_token'], 500);
            }
            
            $code = 'success';
            $response = 'Login Successful';
            $profile = User::find(Auth::user()->id)->starProfile;
            $user = Auth::user();
            $user->roles = unserialize($user->roles);

            return response()->json(compact('code','response','token','user','profile'));


       
    	
    }

    Public function postLogout() {
        Auth::logout();

        return response()->json(['code'=>'success','response'=>'logged out']);
    }

    Public function postStarMakersLogin() {
    }

}
