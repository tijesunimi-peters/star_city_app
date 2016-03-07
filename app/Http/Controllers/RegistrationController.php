<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Http\Controllers\Controller;

class RegistrationController extends Controller
{


    public function postStarCheckEmail(Request $r) {
      // return dd($r)
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


    public function postValidatePhoto(Request $r) {
      $rule = [
        "file"=>'mimes:jpeg,jpg,png'
      ];

      if($r->file('file')) {

        $v = \Validator::make($r->all(), $rule);
        if($v->fails()) {
          return response()->json(['code'=>"error","response"=>"Photo should be in jpeg/jpg/png format"]);
        }
        
        if(!$this->checkImageSize($r->file('file'))) {
          return response()->json(['code'=>'error','response'=>"Pls make sure photo is about 1MB, width: 180px and Height: 180px"]);
        };



      } else {
        return response()->json(['code'=>"error","response"=>$r->file("file")]);
      }

      if($this->photoMove($r->file('file'))) {
          return response()->json(['code'=>'success','response'=>'File Upload Successful']);
        } else {
          return response()->json(['code'=>'error','response'=>'File Upload Failed; Pls make sure the file conforms to the specificationa']);
        }
      
    }

    Private function photo_existence($file) {
      if(file_exists('passports/'.$file)) {
          unlink('passports/'.$file);
        }
        return true;
    }

    Private function photoMove($file) {
      if($file->move('passports',\Hash::make($file->getClientOriginalName()).".".$file->getClientOriginalExtension())) {
          return true;
        } else {
          return false;
        }
    }

    Private function checkImageSize($file) {
      $file_info = getimagesize($file);
      if($file_info[0] > 180 || $file_info[1] > 180) {
        return false;
      } 
      return true;
    }


    Private function uploadPhoto($file) {
      if($this->photoMove($file->getClientOriginalName())) {
        return true;
      } else {
        return false;
      }
    }

    Public function postPicUploader(Request $r) {
      
    }
}
