"use strict";

/**
* StarCityApp Module
*
* Description
*/
angular.module('StarCityApp')
.factory('jwtInterceptor', function($window){
  var token = $window.sessionStorage.getItem('userData') ? JSON.parse($window.sessionStorage.getItem('userData')).token : "";

  var _ = {};

  _.request = function(config) {
    if(token && !/(angular-ui-notification.html)/.test(config.url)) {
      config.url = config.url+'?token='+token;
    }
    return config;
  }


  return _;
})