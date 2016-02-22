// 'use strict';

angular.module('StarCityApp')
  .controller('SignupCtrl', function ($scope,$location,$state,RegisterService) {
  	$scope.page = {
  		name: 'Registration'
  	}

    

   
    $scope.getStarsForm = function() {
    	$state.go('preLogin.stars-form');
    	
    }

    $scope.getStarMakersForm = function() {
    	$state.go('preLogin.starMakers-form');
    	
    }

    $scope.starsRegister = function() {
        //This is going to connect to the RegisterService in the Service
        RegisterService.starsRegister($scope.starsRegisterData).then(function(res) {
          console.log(res);
        });
    }

    $scope.starsFBRegister = function() {
      /// 
      console.log('Fb Things');
    }
    



  })
  .service('RegisterService', function ($q,$http) {
    var functions = {};

    functions.starsRegister = function(data) {
      var deferred = $q.defer();
      $http.post('index.php/register/stars',data).then(function(res) {
        deferred.resolve(res);
      }).catch(function(e) {
        deferred.reject(e);
      });
      return deferred.promise;
    };

    return functions;

  });
