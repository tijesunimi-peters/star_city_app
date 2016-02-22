'use strict';

angular.module("StarCityApp")
  .service('Login', function($http, $cookies,$timeout,$q,$window) {
    
    var userModel = {};
   
    userModel.serverCall = function(data) {
    	var deferred = $q.defer();
    	$http.post('index.php/login/stars-login/',data).then(function(res) {
    		deferred.resolve(res)
    	}).catch(function(e) {
    		deferred.reject(e);
    	});
        
    	return deferred.promise;

    }

    userModel.getUser = function() {
    	var user = $window.sessionStorage.getItem('auth');


    	if(user) {
    		return true;
    	} else {
    		return false;
    	}
    	
    }

    userModel.tryLink = function() {
    	 var q = $q.defer();
    	$http.get('index.php/login').then(function(res) {
    		
    		q.resolve(res.data);
    		
    	}).catch(function(e) {
    		q.reject(e);
    	});

    	return q.promise;
    }

    userModel.starFbLogin = function() {
        var q = $q.defer();
        FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me','GET',{"fields":"id,name,birthday,first_name,last_name,gender,website,middle_name,quotes,email"}, function(res) {
                        if(res.error || !res) {
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

    return userModel;


  });
