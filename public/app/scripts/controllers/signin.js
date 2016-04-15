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
                            message: result.data.response,
                            positionX: 'bottom',
                            positionY: 'left'
                        });
                    } else if (result.data.code === 'success') {

                        Notification.success({
                            message: 'Login Successful',
                            positionX: 'bottom',
                            positionY: 'left'
                        });
                        var user = {};
                        user = result.data.profile;
                        user.email = result.data.user.email;
                        user.username = result.data.user.name;
                        user.roles = result.data.user.roles;
                        user.token = result.data.token;
                        $window.sessionStorage.setItem('userData', JSON.stringify(user));

                        $state.go('dashboard.dbIndex',{id: result.data.user.id});
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
                console.log(res);
                if(res.accessToken) {
                    var data = {'email':res.email,'password':res.accessToken};
                    Login.fbSignin(data).then(function(res) {
                        console.log(res);
                    });

                } else {
                    console.log("No Authentication");
                }
            });
        }



    });

