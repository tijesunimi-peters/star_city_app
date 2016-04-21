"use strict";

/**
* StarCityApp
*
* Description
*/
angular.module('StarCityApp')
.controller('AuditionsController', function($scope){
  $scope.here = "Hey";
  $scope.myData = [
      {
          "firstName": "Cox",
          "lastName": "Carney",
          "company": "Enormo",
          "employed": true
      },
      {
          "firstName": "Lorraine",
          "lastName": "Wise",
          "company": "Comveyer",
          "employed": false
      },
      {
          "firstName": "Nancy",
          "lastName": "Waters",
          "company": "Fuelton",
          "employed": false
      }
    ];
})