<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Contracts\Auth\Guard;



class Stars extends Model implements AuthenticatableContract, CanResetPasswordContract
{
	use Authenticatable, CanResetPassword;
    protected $table = 'stars';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name','sex','city','state','address','image'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];




    public function profile($id) {
        // this is to get the stars profile
    }

    public function editProfile($id) {
        // for editing the profile
    }

    public function deleteAccount($id) {
        // deleting
    } 


    public function applyForJob($job_id) {
        // ability to apply for an audition
    }

    public function likes($id) {
        // all the likes to a star
    }

    

}
