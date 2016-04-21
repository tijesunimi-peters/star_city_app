<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\ProfilePicRequest;
use App\Http\Requests\StarRegistrationRequest as SRR;
use App\Http\Requests\StarMakerRegRequest;

use App\Http\Requests\CheckEmailRequest;
use App\User;
use App\Star;
use App\StarMaker;
use App\Http\Controllers\Controller;
use App\Events\StarMakerEmailChecked;

class RegistrationController extends Controller
{
    Private $file_name = null;


    public function postStarCheckEmail(CheckEmailRequest $r) {
      
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

    Public function postStarMakerCheckEmail(CheckEmailRequest $r) {
      if(!$r->input('email')) {
        return response()->json(['code'=>'error','response'=>'Email Index not set']);
      }
      $user = User::where('email','=',$r->input('email'))->first();

      if(!empty($user) && $user->star_maker == 1) {
        return response()->json(['code'=>'error','response'=>'Account is registered']);
      } else {
        return response()->json(['code'=>'success','response'=>true]);
      }

    }

    public function postValidatePhoto(ProfilePicRequest $r) {

      if(!$this->checkImageSize($r->file('file'))) {
          return response()->json(['code'=>'error','response'=>"Pls make sure photo is about 1MB, width: 180px and Height: 180px"]);
        };

      if($this->photoMove($r->file('file'))) {
          return response()->json(['code'=>'success','response'=>'File Upload Successful','file_name'=>$this->file_name]);
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
      $sha = sha1($file->getClientOriginalName()).".".$file->getClientOriginalExtension();
      if($file->move(base_path().'/passports',$sha)) {
          $this->file_name = $sha;
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

    Public function postRegisterStar(SRR $r) {
      $star = new Star;

      $star->first_name = $r->first_name;
      $star->last_name = $r->last_name;
      $star->address = isset($r->address) ? $r->address : "";
      $star->sex = $r->input('sex')['value'];
      $star->city = $r->input('city');
      $star->state = $r->input('state')['name'];
      $star->image = $r->profile_pic;
      $star->bio = $r->bio;
      $star->roles = serialize($r->role);

      $newUser = new User;

      $newUser->name = $r->username;
      $newUser->email = $em = $r->email;
      $newUser->password = isset($r->password) ? \Hash::make($r->password) : \Hash::make('');
      $newUser->access_token = isset($r->access_token) ? $r->access_token : "";
      $newUser->star = 1;

      if($newUser->save()) {
        $user = User::where('email','=',$em)->first();
        if($user->starProfile()->save($star)) {
          return response()->json(['code'=>'success','response'=>'Registration Successful']);
        } else {
          return response()->json(['code'=>'error','response'=>'Registration Failed']);
        } 
      } else {
        return response()->json(['code'=>'error','response'=>'Registration Failed']);
      }
    }

    Public function postFbRegistration(Request $r) 
    {
      $star = new Star;


      $star->first_name = $r->first_name;
      $star->last_name = $r->last_name;
      $star->address = isset($r->address) ? $r->address : "";
      $star->sex = $r->input('sex')['value'];
      $star->city = $r->input('city');
      $star->state = $r->input('state')['name'];
      $star->image = $r->profile_pic;
      $star->bio = $r->bio;

    }

    Public function postRegisterStarMaker(StarMakerRegRequest $r) {
      $user = new User;
      $user->name = $r->username;
      $user->star_maker = 1;
      $user->email = $r->email;
      $user->password = \Hash::make($r->password);
      
      $profileData = new StarMaker;
      $profileData->address = $r->address;
      $profileData->city = $r->city;
      $profileData->state = $r->state;
      $profileData->image = $r->logo_image;
      $profileData->company_name = $r->company_name;

      $checkEmail = User::where('email','=',$r->email)->first();

      if(!empty($checkEmail) && $checkEmail->star == 1) 
      {
        if($checkEmail->starMakerProfile()->save($profileData)) {
          $user = User::find($checkEmail->id);
          $user->star_maker = 1;
          if($user->save()) {
            return response()->json(['code'=>'success','response'=>'Email is registered as a Star and Star Maker;<br />Login with your initial username and password']);
          } else {
            return response()->json(['code'=>'error','response'=>'User not Updated, but Star Maker Created']);
          };
        } else {
          return response()->json(['code'=>'error','response'=>'Star Maker Not Created']);
        }
        
      } elseif(!empty($checkEmail) && $checkEmail->star_maker == 1) 
      {
        return response()->json(['code'=>'error','response'=>'Account Already Exists']);
      }

      if($user->save()) {
        $profileData->user_id = $user->id;
        if($profileData->save()) {
          return response()->json(['code'=>'success','response'=>'Star Maker Registration Successful']);
        } else {
          return response()->json(['code'=>'error','response'=>'Star Maker Registration Failed']);
        }
      } else {
        return response()->json(['code'=>'error','response'=>'Star Maker Registration Failed']);
      }
    }
}
