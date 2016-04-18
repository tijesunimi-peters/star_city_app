'use strict';

angular.module('StarCityApp')
    .controller('SigninCtrl', function($scope, $state, Login, Notification, $timeout, $window) {
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
                        $window.location.reload();

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
                if (res.accessToken) {
                    var data = { 'email': res.email, 'access_token': res.id };
                    Login.fbSignin(data).then(function(result) {
                        if (result.data.code === "success") {
                            Notification.success({ message: result.data.response,positionY:'bottom',positionX:'left'});

                            var user = {};
                            user = result.data.profile;
                            user.email = result.data.user.email;
                            user.username = result.data.user.name;
                            user.roles = result.data.user.roles;
                            user.token = result.data.token;
                            $window.sessionStorage.setItem('userData', JSON.stringify(user));
                            // console.log($state);
                            // $state.reload('dashboard.dbIndex', { id: result.data.user.id });
                            $window.location.reload();

                        } else {
                            Notification.success({ message: result.data.response,positionY:'bottom',positionX:'left'});

                        }
                    });

                } else {
                    console.log("No Authentication");
                }
            });
        }



    });
