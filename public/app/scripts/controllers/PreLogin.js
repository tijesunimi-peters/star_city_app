'use strict';

angular.module('StarCityApp')
    .controller('PreloginCtrl', function($scope, $state, Registrationservice, Notification, $cacheFactory, FileUploader) {
        $scope.emailExists = false;
        $scope.addVideo = true;
        $scope.addAudio = true;
        $scope.canUpload = false;
        $scope.image = null;

        var picUpload = $scope.picUpload = new FileUploader({
            url: "index.php/registration/pic-uploader",
            alias: 'pics',
            queueLimit: 3
        });

        $scope.picUpload.filters.push({
            name: 'customFilter',
            fn: function(item, options) {
                return this.queue.length < 3;
            }
        });



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
            if (!$scope.registration_data.email) {
                $state.go('preLogin.stars-form-1');

            }


        }

        $scope.addVideo = function(videoInput) {
            if (typeof videoInput !== 'undefined' && videoInput.length > 0) {
                $scope.registration_data.videoLink3.push(videoInput);
                if ($scope.registration_data.videoLink3.length === 3) {
                    $scope.addVideo = false;
                }
            }

        }

        $scope.addAudio = function(audioInput) {
            if (typeof audioInput !== 'undefined' && audioInput.length > 0) {
                $scope.registration_data.audioLink3.push(audioInput);
                if ($scope.registration_data.videoLink3.length === 3) {
                    $scope.addAudio = false;
                }

            }
        }

        $scope.pushData = function(next) {

            if (!$scope.registration_data.email) {
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
                    // $scope.submit();
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
            // $scope.submit();
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
            if ($scope.registration_data.password !== $scope.registration_data.confirm_password) {
                Notification.error({ message: "Password Does not Match", positionY: "bottom", positionX: "left" });
            } else {
                $state.go('preLogin.stars-form-3');
            }

        }

        $scope.check_password = function(password,confirm_password) {
            if ((typeof password != 'undefined') && (typeof confirm_password != 'undefined')) {
                if (password.length < 8) {
                    Notification.error({ message: "Password must be at least 8 in length", positionY: "bottom", positionX: "left" });
                    return false;
                }
                if (password != confirm_password) {
                    Notification.error({ message: "Password Does not Match", positionY: "bottom", positionX: "left" });
                    return false;
                }

                var regularExpression = /[!@#$%^&*]{1}/;
                if (!regularExpression.test(password)) {
                    Notification.error({ message: "Password must contain at least one character", positionY: "bottom", positionX: "left" });
                    return false;
                } else {
                    return true;
                }



            }
        }


        $scope.submit = function() {
            if (picUpload.queue.length !== 0) {
                picUpload.uploadAll();
                picUpload.onCompleteAll = function() {
                    console.info('Complete Upload');
                };
            }


            Registrationservice.submit($scope.registration_data).then(function(res) {
                if (res.code === 'success') {
                    Notification.success({
                        'message': 'Pls Sign in with your email and password',
                        'positionY': 'bottom',
                        'positionX': 'left'
                    });
                    $state.go('preLogin.stars-signin');
                } else {
                    Notification.error({
                        'message': res.response,
                        'positionY': 'bottom',
                        'positionX': 'left'
                    });
                }
            })

        }

        $scope.checkFile = function(photo) {
            Registrationservice.checkPhoto(photo).then(function(res) {
                if (res.data.code === 'error') {
                    Notification.error({
                        message: res.data.response,
                        positionY: 'bottom',
                        positionX: 'left'
                    });
                }else if (res.data.code === 'success') {
                    $scope.canUpload = true;
                    $scope.registration_data.profile_pic= $scope.starmaker.logo_image = $scope.image = res.data.file_name;
                    Notification.success({
                        message: res.data.response,
                        positionY: 'bottom',
                        positionX: 'left'
                    });
                } else {
                    Notification.error({
                        message: "Error Occured Pls check the file and try again",
                        positionY: 'bottom',
                        positionX: 'left'
                    });
                }

                    
                
            });


        }


        $scope.fbReg = function() {
            var data;
            Registrationservice.fbReg().then(function(res) {
                console.log(res);
                $scope.registration_data.email = res.email;
                var a = res.birthday.split('/').reverse();
                var format = [a[0],a[2],a[1]];
                $scope.registration_data.DOB = format.join("-");
                $scope.registration_data.first_name = res.first_name;
                $scope.registration_data.last_name = res.last_name;
                $scope.registration_data.access_token = res.id;

                if(res.gender === 'male') {
                    $scope.registration_data.sex = $scope.sexOptions[0];
                } else {
                    $scope.registration_data.sex = $scope.sexOptions[1];
                }
                $scope.registration_data.city = res.location.name;
                return;
                $scope.pushData('page2');
            });
        }
        $scope.starmaker = {};

        $scope.starMakerData = function() {
          Registrationservice.starMakerReg($scope.starmaker).then(function(res) {
            if(res.data.code === 'error') {
                Notification.error({message:res.data.response,positionY:'bottom',positionX:'left'});
            } else if (res.data.code === 'success') {
                Notification.success({message:res.data.response,positionX:'left',positionY:'bottom'});
            }
          });
        }

    });
