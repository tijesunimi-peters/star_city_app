<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','access_token','star','star_maker'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    Public function starProfile() {
        return $this->hasOne('\App\Star','user_id','id');
    }

    public function starMakerProfile() {
        return $this->hasOne('\App\StarMaker');
    }

    Public function auditions() {
        return $this->hasMany('\App\Audition');
    }

    Public function auditionApplications() {
        return $this->hasMany('\App\AuditionApplication','auditions_id');
    }
}
