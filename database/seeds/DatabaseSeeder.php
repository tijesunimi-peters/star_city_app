<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
// use App\User;


class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();

        DB::table('users')->delete();

        $user = ['name'=>'peters','email'=>'tijesunimi48@gmail.com','password'=>Hash::make('peters'),'star'=>1,'star_maker'=>1];
        User::create($user);
        $this->call(StarTableSeeder::class);
        
        Model::reguard();
    }
}


