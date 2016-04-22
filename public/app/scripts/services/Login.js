'use strict';

angular.module("StarCityApp")
    .service('Login', function($http, $cookies, $timeout, $q, $window) {

        var userModel = {};

        userModel.serverCall = function(data) {
            var deferred = $q.defer();
            $http.post('index.php/login/stars-login/', data).then(function(res) {
                deferred.resolve(res)
            }).catch(function(e) {
                deferred.reject(e);
            });

            return deferred.promise;

        }

        userModel.starFbLogin = function() {
            var q = $q.defer();
            FB.login(function(response) {
                if (response.authResponse) {
                    // console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', 'GET', { "fields": "email" }, function(res) {
                        if (res.error || !res) {
                            q.reject('No Response');
                        } else {
                            // console.log(res);
                            res.accessToken = FB.getAuthResponse().accessToken;
                            q.resolve(res);
                        }
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });

            return q.promise;
        }


        userModel.logout = function() {
            var d = $q.defer();
            $http.post('index.php/login/logout').then(function(res) {
                $window.sessionStorage.removeItem('userData');
                d.resolve(res);
            }).catch(function(e) {
                d.reject(e);
            })

            return d.promise;
        }

        userModel.fbSignin = function(data) {
            var q = $q.defer();
            $http.post('index.php/login/fb-signin',data).then(function(res) {
                q.resolve(res);
            }).catch(function(e) {
                q.reject(e);
            });

            return q.promise;
        }

        userModel.starMakersLogin = function(data) {
            var q = $q.defer();

            $http.post('index.php/login/star-makers-login',data).then(function(res) {

                q.resolve(res);
            }).catch(function(e) {
                q.resolve(e);
            });

            return q.promise;
        }



        return userModel;


    });
