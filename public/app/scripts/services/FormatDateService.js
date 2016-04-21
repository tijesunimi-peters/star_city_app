"use strict";

/**
* StarCityApp Module
*
* Description
*/
angular.module('StarCityApp')
.service('FormatDateService', function(){
  var _ = {};

  _.format = function(dateString) {
    var dateAr = dateString.split('/').reverse();
    dateAr = [dateAr[0],dateAr[2],dateAr[1]];

    return dateAr.join('-');
  }

  return _;
});