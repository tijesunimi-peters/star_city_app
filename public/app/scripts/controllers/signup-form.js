'use strict';

angular.module('StarCityApp')
    .controller('SignupFormCtrl', function($scope, $state) {
        $scope.getStarsForm = function() {
            $state.go('preLogin.stars-form-1');
        }

        $scope.continueAsStarMaker = function() {
          $state.go('preLogin.starMakers-form');
        }

        $scope.getStarMakersForm = function() {
          $state.go('preLogin.starMakers-form');
        }

        
    });
