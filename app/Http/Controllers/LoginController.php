<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\UsersLoginRequest as ULR;
use App\Http\Controllers\Controller;
use \Validator;
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
            $user = Auth::user();

            return response()->json(compact('code','response','token','user'));


       
    	
    }

    Public function postLogout() {
        Auth::logout();

        return response()->json(['code'=>'success','response'=>'logged out']);
    }

    Public function postStarMakersLogin() {
    	// $rules = [
    	// 'email'=>'email|required|exists:star_makers,email',
    	// 'password'=>'required'

    	// ];

    	// $input = ['email'=>$request->input('email'),'password'=>$request->input('password')];

    	// $v = Validator::make($input,$rules);

    	// if($v->fails()){
    	// 	return response()->json($v->messages());
    	// }

    	// if(!Auth::attempt($input)) {
    	// 	return response()->json(['error'=>"Email and Password combination Incorrect"]);
    	// }

    	// return response()->json(Auth::user());
    }

}
