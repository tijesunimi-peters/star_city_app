<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\PasswordResetModel as PRM;
use Event;
use App\Events\PasswordConfirmed as PCEvent;

class PwdConfirmationCtrl extends Controller
{
    Public function confirmPassword(Request $r) {
      $token = urldecode($r->token);
      $id = $r->id;

      if($pwd = PRM::find($id)) {
        $deadline = strtotime($pwd->created_at) + 86400;
        $pageOpenTime = strtotime('now');

        if(abs($deadline - $pageOpenTime) >= 86400) {
          return "Password Token expired";
        } 

        event(new PCEvent($pwd));
        \Auth::logout();
        return redirect('/');

      } else {
        return "Password Change Process Terminated";
      }
    }
}
