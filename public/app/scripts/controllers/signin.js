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

        $scope.starMakersLogin = function() {
            Login.starMakersLogin($scope.starmaker).then(function(res) {
                if(res.status === 422) {
                    Notification.error({ "message" : res.data.email[0],positionX:'left',positionY:'bottom' });
                    return;
                } else if(res.data.code === "error") {
                    Notification.error({message:res.data.response,positionX:'left',positionY:'bottom'});
                    return;
                } else if(res.data.code === "success") {
                    Notification.success({message:res.data.response,positionX:'left',positionY:'bottom'});
                    var user = {};
                    user = res.data.profile;
                    user.email = res.data.user.email;
                    user.username = res.data.user.name;
                    user.roles = res.data.user.roles;
                    user.token = res.data.token;
                    $window.sessionStorage.setItem('userData', JSON.stringify(user));
                    $window.location.reload();
                } else {
                    Notification.error({message:"Error Occured; Pls Try Again",positionY:'bottom',positionX:'left'});
                    return;
                }
            })
        }



    });
