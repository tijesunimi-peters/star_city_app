"use strict";

angular.module("StarCityApp")
  .service('PasswordResetService', function($http,$q){
    var _ = {};

    _.checkEmail = function(email) {
      var q = $q.defer();
      $http.post("index.php/password_reset/verify-email",email).then(function(res) {
        q.resolve(res.data);
      }).catch(function(e) {
        q.reject(e);
      });

      return q.promise;
    }

    _.changePassword = function(data) {
      var q = $q.defer();
      $http.post("index.php/password_reset/save-password",data).then(function(res) {
        q.resolve(res.data);
      }).catch(function(e) {
        q.reject(e);
      });

      return q.promise;
    }

    return _;
  });