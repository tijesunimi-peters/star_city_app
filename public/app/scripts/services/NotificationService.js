'use strict';

/**
* StarCityApp ule
*
* Description
*/
angular.module('StarCityApp')
.service('NotificationService', function(Notification){
  var _ = {};

  _.error = function(msg) {
    Notification.error({message:msg,positionX:'left',positionY:'bottom'});
  }

  _.success = function(msg) {
    Notification.success({message:msg,positionX:'left',positionY:'bottom'});
  }

  return _;
  
})