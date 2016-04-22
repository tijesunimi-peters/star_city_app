"use strict";

/**
* StarCityApp
*
* Description
*/
angular.module('StarCityApp')
.controller('AuditionsController', function($scope,$state,ArrayFactory,AuditionService,FormatDateService,NotificationService,UserService){
  $scope.audition = {};
  $scope.auditions = {};
  $scope.auditionView = {};
  $scope.view = false;
  $scope.userType = UserService.getUserType();
  $scope.genders = ArrayFactory.auditionsGenders();
  $scope.categories = ArrayFactory.auditionsCategories();
  $scope.types = ArrayFactory.auditionsTypes();



  $scope.getAuditions = function() {
    AuditionService.allAuditions().then(function(res) {
      if(res.status !== 200) {
        NotificationService.error(res.statusText);
        return;
      } else if(res.data.code === 'error') {
        NotificationService.error(res.data.response);
        return;
      }
      $scope.view = false;
      $scope.auditions = ArrayFactory.formatAuditions(res.data.response);
    });
  }

  $scope.submitAudition = function() {
    $scope.audition.date = FormatDateService.format($scope.audition.dateObj.toLocaleDateString());
    $scope.audition.category = ArrayFactory.objToArray($scope.audition.category);

    AuditionService.submitAudition($scope.audition).then(function(res) {
      if(res.data.code === 'success') {
        NotificationService.success(res.data.response);
        $state.go('dashboard.container.auditions.index');
      } else if(res.data.code === 'error') {
        NotificationService.error(res.data.response);
      }

      if(res.status !== 200) {
        NotificationService.error(res.statusText);
      }


    })
  }

  $scope.apply = function(audition_id) {
    if(UserService.getUserType() !== 'star') {
      NotificationService.error('Action not Allowed');
      return;
    }

    AuditionService.applyToAudition(audition_id).then(function(res) {
      if(res.data.code === 'success') {
        NotificationService.success(res.data.response);
      } else if(res.data.code === 'error') {
        NotificationService.error(res.data.response);
        return;
      } else if(res.status !== 200) {
        NotificationService.error(res.statusText);
      }
    });
  }

  $scope.viewAudition = function() {
    AuditionService.getAudition($state.params.audition_id).then(function(res) {
      if(res.data.code === 'success') {
        $scope.auditionView = res.data.response;
        $scope.auditionView.date = new Date($scope.auditionView.date).toDateString();
        $scope.view = true;
      } else if(res.data.response === 0) {
        NotificationService.error(res.data.response);
        return;
      } else if(res.status !== 200) {
        NotificationService.error(res.statusText);
        return;
      }

    })
  }

  $scope.delete = function(audition_id) {
    if(UserService.getUserType() !== 'star_maker') {
      NotificationService.error('Action not Allowed');
      return;
    }

    AuditionService.getDeleteAudition(audition_id).then(function(res) {
      if(res.data.code === 'success') {
        NotificationService.success(res.data.response);
        $scope.view = false;
        $scope.auditions = {};
        $scope.myAuditions();
      } else if(res.data.code === 'error') {
        NotificationService.error(res.data.response);
        return;
      } else if(res.status !== 200) {
        NotificationService.error(res.statusText);
      }
    });
  }

  $scope.myAuditions = function() {
    AuditionService.getMyAuditions().then(function(res) {
      if(res.status !== 200) {
        NotificationService.error(res.statusText);
        return;
      } else if(res.data.code === 'error') {
        NotificationService.error(res.data.response);
        return;
      }

      $scope.view = false;
      $scope.auditions = ArrayFactory.formatAuditions(res.data.response,true);
    });
  }

  $scope.mySavedAuditions = function() {
    AuditionService.getMySavedAuditions($state.params.id).then(function(res) {
      if(res.status !== 200) {
        NotificationService.error(res.statusText);
      } else if(res.data.code === "error") {
        NotificationService.error(res.data.response);
      } 

      $scope.view = false;
      $scope.auditions = ArrayFactory.formatAuditions(res.data.response,true);
    });
  }
})