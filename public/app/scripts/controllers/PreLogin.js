'use strict';

angular.module('StarCityApp')
    .controller('PreloginCtrl', function($scope, $state, Registrationservice, Notification,FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
        	url:'index.php/register/photo-upload',
        	autoUpload: false,
        	queueLimit: 1

        });
        var video = $scope.video = new FileUploader({
        	url:'index.php/register/photo-upload',
        	autoUpload: false,
        	queueLimit: 1,
        	alias: 'video'

        });
        var video3 = $scope.video3 = new FileUploader({
        	url:'index.php/register/photo-upload',
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

        var reg_data = $scope.registration_data = {
            sex: {
                id: '3',
                'value': 'sex'
            },
            state: {
                id: '38',
                name: 'state'
            },
            role: {
                id: 3,
                value: ''
            }
        };

        $scope.sexOptions = [{
            id: 1,
            value: 'male'
        }, {
            id: 2,
            value: 'female'
        }, {
            id: 3,
            value: 'sex'
        }];

        $scope.roles = [{
            id: 1,
            value: 'Singer'
        }, {
            id: 2,
            value: 'Acting'
        }, {
            id: 3,
            value: ''
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



        $scope.pushData = function(next) {
        	console.log(video3);
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
                    Notification.error({
                        message: res.data.response,
                        positionX: 'left',
                        positionY: 'bottom'
                    })
                }

                if (res.data.code == 'success') {
                    Notification.success({
                        message: 'Redirecting.....',

                        positionX: 'left',
                        positionY: 'bottom'
                    });

                    $state.go('preLogin.stars-form-2');
                }

            });


        }

        $scope.page3 = function() {
            $state.go('preLogin.stars-form-3');
        }

       $scope.check_password = function() {
       	 if(typeof $scope.registration_data.password != 'undefined' && typeof $scope.registration_data.confirm_password != 'undefined') {
       	 	if($scope.registration_data.password !== $scope.registration_data.confirm_password) {
       	 		return false;
       	 	} else {
       	 		return true;
       	 	}
       	 }
       }
        

    });
