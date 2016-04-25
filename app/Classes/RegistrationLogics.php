<?php
namespace App\Classes;

use App\User;

/**
* Process Registation Data
*/
class RegistrationLogics
{
  protected static $file_name;
  
  public static function checkEmail($email,$type) {
    $user = User::where('email','=',$email)->first();

    if(empty($user)) {
        return null;
    }

    switch ($type) {
      case 'star':
        return $user->star == 1 ? true : false;
        break;

      case 'star maker':
        return $user->star_maker == 1 ? true : false;
        break;
      
      default:
        return null;
        break;
    }

  }

  Public static function processPhoto($photo) {
    if(!self::checkImageSize($photo)) {
          return ['code'=>'error','response'=>"Pls make sure photo is about 1MB, width: 180px and Height: 180px"];
      };

      if(self::photoMove($photo)) {
          return ['code'=>'success','response'=>'File Upload Successful','file_name'=>self::$file_name];
        } else {
          return ['code'=>'error','response'=>'File Upload Failed; Pls make sure the file conforms to the specification'];
        }
  }

  Public static function organizeData() {

  }


  Private static function photo_existence($file) {
      if(file_exists('passports/'.$file)) {
          unlink('passports/'.$file);
        }
        return true;
    }

    Private static function photoMove($file) {
      $sha = sha1($file->getClientOriginalName()).".".$file->getClientOriginalExtension();
      if($file->move(base_path().'/passports',$sha)) {
          self::$file_name = $sha;
          return true;
        } else {
          return false;
        }
    }

    Private static function checkImageSize($file) {
      $file_info = getimagesize($file);
      if($file_info[0] > 180 || $file_info[1] > 180) {
        return false;
      } 
      return true;
    }


    Private static function uploadPhoto($file) {
      if(self::photoMove($file->getClientOriginalName())) {
        return true;
      } else {
        return false;
      }
    }


}