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
use App\Classes\RegistrationLogics;
use App\Jobs\ProcessData;

class RegistrationController extends Controller
{
    Private $file_name = null;

    function __construct(RegistrationLogics $registration)
    {
      $this->reg = $registration;
    }


    public function postStarCheckEmail(CheckEmailRequest $r) {

      return $this->reg->checkEmail($r->email,'star') ? response()->json(['code'=>'error','response'=>'Email is registered as a Star']) : response()->json(['code'=>'success','response'=>true]);

    }

    Public function postStarMakerCheckEmail(CheckEmailRequest $r) {

      return $this->reg->checkEmail($r->email,'star maker') ? response()->json(['code'=>'error','response'=>'Email is registered']) : response()->json(['code'=>'success','response'=>true]);

    }

    public function postValidatePhoto(ProfilePicRequest $r) {

      return $this->reg->processPhoto($r->file('file'));
      
    }

    
    Public function postRegisterStar(SRR $r) {
      $this->dispatch(new ProcessData($r->all(),'star'));
      return ['code'=>'success','response'=>'Check your mail'];
    }

    

    Public function postRegisterStarMaker(StarMakerRegRequest $r) {
      $this->dispatch(new ProcessData($r->all(),'star maker'));
      return ['code'=>'success','response'=>'Check your mail'];
      
    }
}
