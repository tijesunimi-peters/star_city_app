<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\PasswordResetModel as PRM;
use Event;
use App\Events\PwdResetSaved as PRSEvent;

class PasswordResetController extends Controller
{
    Public function postVerifyEmail(Request $r) {
      $user = User::where('email','=',$r->email)->first();

      if(!empty($user)) {
        return response()->json(['code'=>1]);
      } else {
        return response()->json(['code'=>0]);
      }
      
    }


    Public function postSavePassword(Request $r) {
      $model = new PRM;

      $model->user_id = $r->user_id;
      $model->email = $r->email;
      $model->token = \Hash::make($r->password);
      $model->created_at = strftime('%Y-%m-%d %H:%M:%S',strtotime('now'));

      if($model->save()) {
        $pr = PRM::find($model->id);
        event(new PRSEvent($pr));
        return response()->json(['code'=>1]);
      }
    }

    
}
