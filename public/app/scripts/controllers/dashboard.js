'use strict';

angular.module('StarCityApp')
  .controller('DashboardCtrl', function ($scope,UserService) {
    $scope.user = UserService.getUser();
  });
