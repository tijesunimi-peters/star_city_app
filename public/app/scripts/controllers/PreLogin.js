'use strict';

angular.module('StarCityApp')
    .controller('PreloginCtrl', function($scope, $state, Registrationservice, NotificationService, StatesFactory, FileUploader, FormatDateService) {
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


        $scope.states = StatesFactory.getStates();


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
                NotificationService.error('Please fill in your Email');
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
                    NotificationService.error(res.data.response);
                }

                if (res.data.code == 'success') {
                    NotificationService.success('Proceeding');
                    $state.go('preLogin.stars-form-2');
                }
            });


        }

        $scope.page3 = function() {
            if ($scope.registration_data.password !== $scope.registration_data.confirm_password) {
                NotificationService.error("Password Does not Match");
                return;
            } else {
                $state.go('preLogin.stars-form-3');
            }

        }

        $scope.check_password = function(password, confirm_password) {
            if ((typeof password != 'undefined') && (typeof confirm_password != 'undefined')) {
                if (password.length < 8) {
                    NotificationService.error("Password must be at least 8 in length");
                    return false;
                }
                if (password != confirm_password) {
                    NotificationService.error("Password Does not Match");
                    return false;
                }

                var regularExpression = /[!@#$%^&*]{1}/;
                if (!regularExpression.test(password)) {
                    Notification.error("Password must contain at least one character");
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

            $scope.registration_data.DOB = FormatDateService.format($scope.registration_data.DOB.toLocaleDateString());

            Registrationservice.submit($scope.registration_data).then(function(res) {
                if (res.code === 'success') {
                    NotificationService.success('Pls Sign in with your email and password');
                    $state.go('preLogin.stars-signin');
                } else {
                    NotificationService.error(res.response);
                    return;
                }
            })

        }

        $scope.checkFile = function(photo) {
            Registrationservice.checkPhoto(photo).then(function(res) {
                if (res.data.code === 'error') {
                    NotificationService.error(res.data.response);
                    return;
                } else if (res.data.code === 'success') {
                    $scope.canUpload = true;
                    $scope.registration_data.profile_pic = $scope.starmaker.logo_image = $scope.image = res.data.file_name;
                    NotificationService.success(res.data.response);
                } else {
                    NotificationService.error("Error Occured Pls check the file and try again");
                    return;
                }



            });


        }


        $scope.fbReg = function() {
            Registrationservice.fbReg().then(function(res) {
                $scope.registration_data.email = res.email;
                $scope.registration_data.DOB = new Date(res.birthday);
                $scope.registration_data.first_name = res.first_name;
                $scope.registration_data.last_name = res.last_name;
                $scope.registration_data.access_token = res.id;

                if (res.gender === 'male') {
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
                if (res.data.code === 'error') {
                    NotificationService.error(res.data.response);
                    return;
                } else if (res.data.code === 'success') {
                    NotificationService.success(res.data.response);

                }
            });
        }

    });
