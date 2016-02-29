'use strict';

angular.module('StarCityApp')
  .service('Registrationservice', function Registrationservice($http,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var _ = {};

    _.checkEmail = function(data) {
        var d = $q.defer();
        $http.post('index.php/registration/star-check-email',data).then(function(res) {
          d.resolve(res);
        }).catch(function(e) {
          d.reject(e);
        })

        return d.promise;
    }

    return _;


  });
