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

  $scope.genders = ArrayFactory.auditionsGenders();
  $scope.categories = ArrayFactory.auditionsCategories();
  $scope.types = ArrayFactory.auditionsTypes();

  $scope.submitAudition = function() {
    $scope.audition.date = FormatDateService.format($scope.audition.dateObj.toLocaleDateString());
    $scope.audition.category = ArrayFactory.objToArray($scope.audition.category);

    AuditionService.submitAudition($scope.audition).then(function(res) {
      if(res.data.code === 'success') {
        NotificationService.success(res.data.response);
      } else if(res.data.code === 'error') {
        NotificationService.error(res.data.response);
      }

      if(res.status !== 200) {
        NotificationService.error(res.statusText);
      }


    })
  }

  $scope.apply = function(audition_id) {
    console.log(audition_id);
  }

  $scope.viewAudition = function() {
    // console.log($state.params.)
    if($state.params.audition_id === null) {
      return;
    }
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

  $scope.deleteAudition = function(audition_id) {
    //
  }

  $scope.myAuditions = function() {
    var me = $state.params.id;
    console.log(me);
    // AuditionService.getMyAuditions(me).then(function(res) {

    // })
  }
})