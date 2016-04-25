<?php
namespace App\Jobs;

use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\User;
use App\Star;
use App\StarMaker;
use App\Classes\RegistrationLogics;

class ProcessData extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    private $data;
    private $type;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($data,$type)
    {
        $this->data = $data;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(RegistrationLogics $reg)
    {
        $profileData = [];
        $profileData['city'] = $this->data['city'];
        $profileData['state'] = isset($this->data['state']['name']) ? $this->data['state']['name'] : $this->data['state'];
        $profileData['address'] = isset($this->data['address']) ? $this->data['address'] : "";
        $profileData['roles'] = isset($this->data['role']) ? serialize($this->data['role']) : serialize($this->data['roles']);
        $profileData['bio'] = $this->data['bio'];
        $profileData['image'] = isset($this->data['profile_pic']) ? $this->data['profile_pic'] : $this->data['logo_image'];

        $user = [];
        $user['name'] = $this->data['username'];
        $user['email'] = $this->data['email'];
        $user['password'] = \Hash::make($this->data['password']);
        $user['access_token'] = isset($this->data['access_token']) ? $this->data['access_token'] : '';


        switch ($this->type) {
            case 'star':
                $profileData['first_name'] = $this->data['first_name'];
                $profileData['last_name'] = $this->data['last_name'];
                $user['star'] = 1;
                $profileData['sex'] = $this->data['sex']['value'];
                $profileData['DOB'] = strftime("%Y-%m-%d",strtotime($this->data['DOB']));

                $check = $reg->checkEmail($user['email'],'star');
                if(is_null($check)) {
                    User::create($user)->starProfile()->save(Star::create($profileData));
                }elseif(!$check) {
                    $model = User::where('email','=',$user['email'])->first();
                    $model->update(['star'=>1]);
                    User::find($model->id)->starProfile()->save(Star::create($profileData));
                }
                
                break;
            case 'star maker':
                $profileData['company_name'] = $this->data['company_name'];
                $user['star_maker'] = 1;

                $check = $reg->checkEmail($user['email'],'star maker');

               if(is_null($check)) {
                    User::create($user)->starMakerProfile()->save(StarMaker::create($profileData));
                } elseif(!$check) {
                    $model = User::where('email','=',$user['email'])->first();
                    $model->update(['star_maker'=>1]);
                    User::find($model->id)->starMakerProfile()->save(StarMaker::create($profileData));
                }
                
                break;
            default:
                return false;
                break;
        }
    }
}
