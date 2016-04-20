'use strict';

angular.module('StarCityApp')
    .controller('SigninCtrl', function($scope, $state, Login, NotificationService, $timeout, $window) {
        $scope.error = false;
        $scope.page = {
            name: 'Login'
        }


        var setUserData = function(data,userType) {
            var user = {};
            user = data.profile;
            user.email = data.user.email;
            user.username = data.user.name;
            user.roles = data.profile.roles;
            user.token = data.token;
            user.type = userType;
            $window.sessionStorage.setItem('userData', JSON.stringify(user));
            $window.location.reload();
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
                    NotificationService.error("An Error Occured; Please Check your Username and Password and try again");
                } else {
                    if (result.data.code === 'error') {
                        NotificationService.error(result.data.response);
                    } else if (result.data.code === 'success') {
                        NotificationService.success('Login Successful');
                        setUserData(result.data,'star');
                    }
                }



            });




        }

        $scope.starsLogout = function() {
            $window.sessionStorage.clear();
            Login.logout().then(function(res) {
                $window.location.reload();
            });
        }

        $scope.starFBSignin = function() {
            Login.starFbLogin().then(function(res) {
                if (res.accessToken) {
                    var data = { 'email': res.email, 'access_token': res.id };
                    Login.fbSignin(data).then(function(result) {
                        if (result.data.code === "success") {
                            NotificationService.success(result.data.response);
                            setUserData(result.data,'star');
                        } else {
                            NotificationService.error(result.data.response);

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
                    NotificationService.error(res.data.email[0]);
                    return;
                } else if(res.data.code === "error") {
                    NotificationService.error(res.data.response);
                    return;
                } else if(res.data.code === "success") {
                    NotificationService.success(res.data.response);
                    setUserData(res.data,'star_maker');
                } else {
                    NotificationService.error("Error Occured; Pls Try Again");
                    return;
                }
            })
        }



    });
