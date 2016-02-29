<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Http\Controllers\Controller;

class RegistrationController extends Controller
{
    public function postStarCheckEmail(Request $r) {
      if(!$r->input('email')) {
        return response()->json(['code'=>'error','response'=>'Email Index not set']);
      }
      $user = User::where('email','=',$r->input('email'))->first();

      if(!empty($user) && $user->star == 1) {
        return response()->json(['code'=>'error','response'=>'Email is registered as a Star']);
      } else {
        return response()->json(['code'=>'success','response'=>true]);
      }

      // return response()->json(['code'=>'success','response']);
    }
}
