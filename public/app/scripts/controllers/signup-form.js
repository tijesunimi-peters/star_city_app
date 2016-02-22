'use strict';

angular.module('StarCityApp')
    .controller('SignupFormCtrl', function($scope, $state) {
        $scope.getStarsForm = function() {
            $state.go('preLogin.stars-form-1');
        }
    });
