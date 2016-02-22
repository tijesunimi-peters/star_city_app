'use strict';

angular.module('StarCityApp')
  .controller('AuthcontrollerCtrl', function ($scope,$auth,$state) {
    var vm = this;

    vm.login = function() {


    	var credentials = {
    		email: vm.email,
    		password: vm.password
    	}


    	$auth.login(credentials).then(function(data) {
    		$state.go('users',{});
    	});
    }


  });
