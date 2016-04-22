"use strict";

/**
* StarCityApp Module
*
* Description
*/
angular.module('StarCityApp')
.service('AuditionService', function($http,$q){
  var _ = {};

  _.submitAudition = function(data) {
    var q = $q.defer();
    $http.post('index.php/auditions/save',data).then(function(res) {
      q.resolve(res);
    }).catch(function(e) {
      q.resolve(e);
    });

    return q.promise;
  }

  _.allAuditions = function() {
    var q = $q.defer();
    $http.get('index.php/auditions/all').then(function(res) {
      q.resolve(res);
    }).catch(function(e) {
      q.resolve(e);
    });

    return q.promise;
  }

  _.getAudition = function(id) {
    var q = $q.defer();
    $http.get('index.php/auditions/view-audition/'+id).then(function(res) {
      q.resolve(res);

    }).catch(function(e) {
      q.resolve(e);
    });

    return q.promise;
  }

  return _;
})