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

    }


    public function postPhotoUpload(Request $r) {
      $rule = [
        "passport"=>'mimes:jpeg,jpg,png'
      ];
      if($r->file('passport')) {

        $v = \Validator::make($r->all(), $rule);
        if($v->fails()) {
          return response()->json(['code'=>"error","response"=>"Photo should be in jpeg/jpg/png format"]);
        }
        if(file_exists('passports/'.$r->file('passport')->getClientOriginalName())) {
          unlink('passports/'.$r->file('passport')->getClientOriginalName());
        }

        if($r->file('passport')->move('passports',$r->file('passport')->getClientOriginalName())) {
          $size = getimagesize('passports/'.$r->file('passport')->getClientOriginalName());
          return response()->json(['code'=>'success','response'=>$size]);

        } else {
          return response()->json(['code'=>'error','response'=>'File Upload Failed']);
        }

      } else {
        return response()->json(['code'=>"error","response"=>"No file was uploaded"]);
      }
      
    }
}
