'use strict';

angular.module('StarCityApp')
  .service('Registrationservice', function Registrationservice($http,$q,Upload,$cacheFactory) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var _ = {};
    var photoCache = $cacheFactory('photStore');

    _.checkEmail = function(data) {
        var d = $q.defer();
        $http.post('index.php/registration/star-check-email',data).then(function(res) {
          d.resolve(res);
        }).catch(function(e) {
          d.reject(e);
        })

        return d.promise;
    }

    _.uploadPhoto = function(photoData) {
      var d = $q.defer();
      $http.post('index.php/registration/photo-upload',photoData).then(function(res) {
        console.log(res);
      })


    }

    _.checkPhoto = function(photo) {
      var d = $q.defer();

      Upload.upload({
            url: 'index.php/registration/validate-photo',
            data: {file: photo}
        }).then(function(res) {
          if(res.data.code === 'success') {
            
            d.resolve(res);
          }
          
        });

        return d.promise;
    }

    _.submit = function(regData) {
      var d = $q.defer();
      $http.post('index.php/registration/register-star',regData).then(function(res) {
        console.log(regData);
      });
    }


    return _;


  });
