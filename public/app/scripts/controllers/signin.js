'use strict';

angular.module('StarCityApp')
    .controller('SigninCtrl', function($scope, $state, Login, Notification, $timeout, crAcl, $window) {
        $scope.error = false;
        $scope.page = {
            name: 'Login'
        }



        $scope.getStarsForm = function() {
            $state.go('preLogin.stars-signin');
        }

        $scope.getStarMakersForm = function() {
            $state.go('preLogin.starMakers-signin');
        }

        $scope.starsLogin = function(data) {
            Login.serverCall(data).then(function(result) {
                if (result.status !== 200) {
                    Notification.error({
                        message: "An Error Occured; Please Check your Username and Password and try again",
                        positionX: 'bottom',
                        positionY: 'left'
                    });
                } else {
                    if (result.data.code === 'error') {
                        Notification.error({
                            message: result.data.error,
                            positionX: 'bottom',
                            positionY: 'left'
                        });
                    } else if (result.data.code === 'success') {

                        Notification.success({
                            message: 'Login Successful',
                            positionX: 'bottom',
                            positionY: 'left'
                        });

                        $window.sessionStorage.setItem('token', result.data.token);

                        $timeout(function() {
                            $state.go('dashboard.dbIndex',{id: result.data.user.id});
                        }, 1000);
                    }
                }



            });




        }

        $scope.starsLogout = function() {
            $window.sessionStorage.clear();
            Login.logout().then(function(res) {
                $state.go('preLogin.stars-signin');
            });
        }

        $scope.starFBSignin = function() {
            Login.starFbLogin().then(function(res) {
                if(res.accessToken) {
                    $window.sessionStorage.setItem('auth',res.accessToken);

                    Notification.success({
                            message: 'Login Successful',
                            positionX: 'bottom',
                            positionY: 'left'
                    });

                    $timeout(function() {
                            $state.go('dashboard.dbIndex');
                    }, 1000);

                } else {
                    console.log("No Authentication");
                }
            });
        }



    });

