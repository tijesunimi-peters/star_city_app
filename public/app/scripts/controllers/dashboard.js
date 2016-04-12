'use strict';

angular.module('StarCityApp')
  .controller('DashboardCtrl', function ($scope,$window) {
    $scope.user = JSON.parse($window.sessionStorage.getItem('userData'));
  });
