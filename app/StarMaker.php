<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StarMaker extends Model
{
    protected $table = 'star_makers';

    protected $fillable = ['company_name','state','city','address','image','roles','bio'];
}
