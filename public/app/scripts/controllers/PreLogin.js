'use strict';

angular.module('StarCityApp')
    .controller('PreloginCtrl', function($scope, $state, Registrationservice, Notification,FileUploader) {
        $scope.emailExists = false;
        var uploader = $scope.uploader = new FileUploader({
        	url:'index.php/registration/photo-upload',
        	autoUpload: false,
        	queueLimit: 1,
            type: 'image/jpeg',
            alias: 'passport'

        });
        var video = $scope.video = new FileUploader({
        	url:'index.php/registration/photo-upload',
        	autoUpload: false,
        	queueLimit: 1,
        	alias: 'video'

        });
        var video3 = $scope.video3 = new FileUploader({
        	url:'index.php/registration/photo-upload',
        	autoUpload: false,
        	queueLimit: 3,
        	alias: 'video3'

        });
        var pic3 = $scope.pic3 = new FileUploader({
        	url:'index.php/register/photo-upload',
        	autoUpload: false,
        	queueLimit: 3,
        	alias: 'pic3'

        });

        $scope.addVideo = true;
        $scope.addAudio = true;

        var reg_data = $scope.registration_data = {
            videoLink3: [],
            audioLink3: []
        };

        $scope.sexOptions = [{
            id: 1,
            value: 'male'
        }, {
            id: 2,
            value: 'female'
        }];

        $scope.roles = [{
            id: 1,
            value: 'Singer'
        }, {
            id: 2,
            value: 'Actor/Actress'
        }, {
            id: 3,
            value: "Dancer"
        }];


        $scope.states = [{
            id: 1,
            name: 'Abia'
        }, {
            id: 2,
            name: 'Adamawa'
        }, {
            id: 3,
            name: 'Akwa Ibom'
        }, {
            id: 4,
            name: 'Anambra'
        }, {
            id: 5,
            name: 'Bauchi'
        }, {
            id: 6,
            name: 'Bayelsa'
        }, {
            id: 7,
            name: 'Benue'
        }, {
            id: 8,
            name: 'Borno'
        }, {
            id: 9,
            name: 'Cross River'
        }, {
            id: 10,
            name: 'Delta'
        }, {
            id: 11,
            name: 'Ebonyi'
        }, {
            id: 12,
            name: 'Edo'
        }, {
            id: 13,
            name: 'Ekiti'
        }, {
            id: 14,
            name: 'Enugu'
        }, {
            id: 15,
            name: 'FCT Abuja'
        }, {
            id: 16,
            name: 'Gombe'
        }, {
            id: 17,
            name: 'Imo'
        }, {
            id: 18,
            name: 'Jigawa'
        }, {
            id: 19,
            name: 'Kaduna'
        }, {
            id: 20,
            name: 'Kano'
        }, {
            id: 21,
            name: 'Katsina'
        }, {
            id: 22,
            name: 'Kebbi'
        }, {
            id: 23,
            name: 'Kogi'
        }, {
            id: 24,
            name: 'Kwara'
        }, {
            id: 25,
            name: 'Lagos'
        }, {
            id: 26,
            name: 'Nasarawa'
        }, {
            id: 27,
            name: 'Niger'
        }, {
            id: 28,
            name: 'Ogun'
        }, {
            id: 29,
            name: 'Ondo'
        }, {
            id: 30,
            name: 'Osun'
        }, {
            id: 31,
            name: 'Oyo'
        }, {
            id: 32,
            name: 'Plateau'
        }, {
            id: 33,
            name: 'Rivers'
        }, {
            id: 34,
            name: 'Sokoto'
        }, {
            id: 35,
            name: 'Taraba'
        }, {
            id: 36,
            name: 'Yobe'
        }, {
            id: 37,
            name: 'Zamfara'
        }, {
            id: 38,
            name: 'state'
        }];

        $scope.backToSignUp = function() {
            $state.go('preLogin.signup.view');
        }


        var checkEmail = function() {
        	if(!$scope.registration_data.email) {
        		$state.go('preLogin.stars-form-1');

        	}

        	
        }

        $scope.addVideo = function(videoInput) {
            if(typeof videoInput !== 'undefined' && videoInput.length > 0) {
                $scope.registration_data.videoLink3.push(videoInput);
                if($scope.registration_data.videoLink3.length === 3) {
                    $scope.addVideo = false;
                }
            }
            
        }

        $scope.addAudio = function(audioInput) {
            if(typeof audioInput !== 'undefined' && audioInput.length > 0) {
                $scope.registration_data.audioLink3.push(audioInput);
                if($scope.registration_data.videoLink3.length === 3) {
                    $scope.addAudio = false;
                }

            }
        }

        $scope.pushData = function(next) {

        	if(!$scope.registration_data.email) {
        		Notification.error({
                        message: 'Please fill in your Email',
                        positionX: 'left',
                        positionY: 'bottom'
                    });
        		$state.go('preLogin.stars-form-1');
        		return;
        	}
            switch (next) {
                case 'page2':
                    $scope.page2();
                    break;
                case 'page3':
                    $scope.page3()
                    break;
                case 'submit':
                    $scope.submit();
                default:
                    $scope.page1();

            }
        }

        $scope.page1 = function() {
            $state.go('preLogin.stars-form-1');
        }

        $scope.page2 = function() {
            Registrationservice.checkEmail($scope.registration_data).then(function(res) {
                if (res.data.code == 'error') {
                    $scope.emailExists = true;
                    Notification.error({
                        message: res.data.response,
                        positionX: 'left',
                        positionY: 'bottom'
                    })
                }

                if (res.data.code == 'success') {
                    Notification.success({
                        message: 'Proceeding',

                        positionX: 'left',
                        positionY: 'bottom'
                    });

                    $state.go('preLogin.stars-form-2');
                }



            });


        }

        $scope.page3 = function() {
            if($scope.registration_data.password !== $scope.registration_data.confirm_password) {
                Notification.error({message: "Password Does not Match",positionY: "bottom",positionX: "left"});
            } else {
                $state.go('preLogin.stars-form-3');
            }
            
        }

       $scope.check_password = function() {
       	 if((typeof $scope.registration_data.password != 'undefined') && (typeof $scope.registration_data.confirm_password != 'undefined')) {
            if($scope.registration_data.password != $scope.registration_data.confirm_password) {
		        Notification.error({message: "Password Does not Match",positionY: "bottom",positionX: "left"});
                return false;
       	 	} else {
       	 		return true;
       	 	}
       	 }
       }


       $scope.submit = function() {
            if($scope.uploader.queue.length > 0) {
                angular.forEach($scope.uploader.queue,function(val,key){
                    val.upload();
                });
            } else {
                $state.go('preLogin.stars-form-2');
                Notification.error({
                    message: "Pls Upload your Photo",
                    positionX: "left",
                    positionY: "bottom"
                });

            }
       }
        

    });
