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

            if(Auth::user()->star != 1) {
                return response()->json(['code'=>'error','response'=>"Account does not exist"]);
            }
            
            $code = 'success';
            $response = 'Login Successful';
            $profile = User::find(Auth::user()->id)->starProfile;
            $profile->roles = unserialize($profile->roles);
            $user = Auth::user();

            return response()->json(compact('code','response','token','user','profile'));


       
    	
    }

    Public function postLogout() {
        Auth::logout();

        return response()->json(['code'=>'success','response'=>'logged out']);
    }

    Public function postStarMakersLogin(ULR $request) {
        $input = ['email'=>$request->email,'password'=>$request->password];
        $starMaker = User::where('email','=',$input['email'])->where('star_maker','=',1)->first();

        if(empty($starMaker) || $starMaker == null) {
            return response()->json(['code'=>'error','response'=>'Account does not exist']);
        }

        try {

            if(!$token = JWTAuth::attempt($input)) {
                return response()->json(['code'=>'error','response'=>"Email and Password combination Incorrect"]);
            } 
        } catch(JWTException $e) {
            return response()->json(['code'=>'error','response' => 'Could not create token'], 500);
        }
        
        $code = 'success';
        $response = 'Login Successful';
        $profile = User::find(Auth::user()->id)->starMakerProfile;
        $profile->roles = unserialize($profile->roles);
        $user = Auth::user();

        return response()->json(compact('code','response','token','user','profile'));
    }

    Public function postFbSignin(Request $r) {
        if($user = User::where("access_token",'=',$r->access_token)->first()) {
            $input = ['email'=>$user->email,'sub'=>$user->id];
            $code = 'success';
            $response = 'Login Successful';
            $profile = User::find($user->id)->starProfile;
            $user->roles = unserialize($user->roles);
            $payload = \JWTFactory::make($input);
            $encoded = JWTAuth::encode($payload);
            JWTAuth::setToken($encoded->get());
            $token = JWTAuth::getToken();
            $token = (string) $token;

            return response()->json(compact('code','response','token','user','profile'));
        } else {
            $response = "Something went wrong; Pls try again";
            $code = "error";

            return response()->json(compact('code','response'));
        }

    }

}
