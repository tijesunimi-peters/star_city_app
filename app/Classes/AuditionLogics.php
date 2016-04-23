<?php
namespace App\Classes;

use App\User;
use App\Audition;
use App\Events\AuditionDeleted;
/**
* 
*/
class AuditionLogics
{

  public $user;
  
  function __construct(User $user)
  {
    $this->user = $user;
  }

  Public function getUser() {
    if($this->user->star_maker != 1) {
      return null;
    }

    return $this->user;
  }

  Public function getAll() {
    $result = [];
    $data = Audition::orderBy('created_at','desc')->get()->toArray();
    foreach ($data as $datum) {
      $result[] = $this->processData($datum,false);
    }
    

    return $result;
  }

  Public function getAudition($id) {
    $audition = Audition::find($id)->toArray();
    return $this->processData($audition,false);
  }



  Private function processData($array,$serialize = true) {
    if($serialize) {
      $array['category'] = serialize($array['category']);
      $array['age'] = serialize($array['age']);
    } else {
      $array['category'] = unserialize($array['category']);
      $array['age'] = unserialize($array['age']);
    }
    

    return $array;
  }

  Public function saveAudition($array) {
    $array = $this->processData($array);

    if($this->user->auditions()->save(Audition::create($array))){
      return true;
    } else {
      return false;
    };
  }

  Public function myAuditions() {
    $result = [];
    $auditions = $this->user->auditions()->orderBy('created_at','desc')->get();
    foreach ($auditions as $audition) {
      $result[] = $this->processData($audition,false);
    }

    return $result;

  }

  Public function delete($id) {
    $audition = $this->user->auditions()->find($id);
    event(new AuditionDeleted($audition));
    $audition->delete();
    return ['success','Delete Successfull'];
  }

  Public function saveApplication($id) {
    if($this->checkApplication($id)) {
        $new_application = new \App\AuditionApplication;
        $new_application->auditions_id = $id;
        if($this->user->auditionApplications()->save($new_application)) {
          return ['success',"Application Saved"];
        } else {
          return ['error','Application not Saved'];
        }
    } else {
      return ['error','You already applied'];
    }
    
  }

  Private function checkApplication($id) {
    $application = \App\AuditionApplication::where('auditions_id','=',$id)->where('user_id','=',$this->user->id)->first();

    if(!empty($application)) {
      return false;
    } else {
      return true;
    }
  }

  Public function savedAuditions() {
    $application_array = [];
    $applications = $this->user->auditionApplications;
    foreach ($applications as $application) {
      $application_array[] = $this->processData($this->user->auditions()->find($application->auditions_id)->toArray(),false);
    }

    return $application_array;
  }

}