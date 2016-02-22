<?php

use Illuminate\Database\Seeder;
use App\StarsModel;

class StarTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       DB::table('stars')->delete();

        $user = ['email' => 'admin@gmail.com', 'password' => Hash::make('peters')];
            
        StarsModel::create($user);
       
    }
}
