<?php
namespace App\Classes;

use App\User;
use App\Audition;
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
    if($this->user->auditions()->find($id)->delete())
    {
      return ['success','Delete Successfull'];
    } else {
      return ['error','Audition not Deleted'];
    }
  }

  Public function saveApplication($id) {
    
  }


}