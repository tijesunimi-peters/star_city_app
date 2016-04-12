'use strict';

angular.module("StarCityApp")
    .service('Login', function($http, $cookies, $timeout, $q, $window) {

        var userModel = {};
        var user = {};

        userModel.serverCall = function(data) {
            var deferred = $q.defer();
            $http.post('index.php/login/stars-login/', data).then(function(res) {
                user = res.data.profile;
                user.email = res.data.user.email;
                user.username = res.data.user.name;
                user.roles = res.data.user.roles;
                $window.sessionStorage.setItem('userData', JSON.stringify(user));
                deferred.resolve(res)
            }).catch(function(e) {
                deferred.reject(e);
            });

            return deferred.promise;

        }

        userModel.getUser = function() {
            var user = $window.sessionStorage.getItem('token');
            if (user) {
                return true;
            } else {
                return false;
            }

        }


        userModel.starFbLogin = function() {
            var q = $q.defer();
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', 'GET', { "fields": "id,name,birthday,first_name,last_name,gender,website,middle_name,quotes,email" }, function(res) {
                        if (res.error || !res) {
                            q.reject('No Response');
                        } else {
                            console.log(res);
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



        return userModel;


    });
