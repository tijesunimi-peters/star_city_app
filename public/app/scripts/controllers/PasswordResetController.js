"use srtict";

angular.module("StarCityApp")
.controller('PasswordResetController', function($scope,Notification,$window,PasswordResetService,$state){
  var user = JSON.parse($window.sessionStorage.getItem('userData'));
  $scope.submit = function() {
    
    if($scope.password_reset.email !== user.email) {
      Notification.error({message:"Email not Correct",positionY:'bottom',positionX:'left'});
      return;
    }

    console.log($scope.password_reset);

    PasswordResetService.checkEmail($scope.password_reset).then(function(res) {
      if(res.code === 1) {
        Notification.success({message:"Email Verified",positionY: 'bottom',positionX:'left'});
        $state.go('dashboard.container.change_password');
      } else {
        Notification.error({message:"Email Not Verified",positionY: 'bottom',positionX:'left'});
      }
    })
  }

  $scope.submit_password = function() {
    var re = /[~!@#$%^&*]{1}/;
    if($scope.password_reset.password.length < 8) {
      Notification.error({message:'Password length must be 8 or more',positionX: 'left',positionY:'bottom'});
      return;
    } else if(!re.test($scope.password_reset.password)) {
      Notification.error({message:'Password must have 1 char',positionX: 'left',positionY:'bottom'});
      return;
    } else if($scope.password_reset.password !== $scope.password_reset.confirm_password) {
      Notification.error({message:'Password not confirmed',positionX: 'left',positionY:'bottom'});
      return;
    }

    $scope.password_reset.email = user.email;
    
    PasswordResetService.changePassword($scope.password_reset).then(function(res) {
      if(res.code === 1) {
        Notification.success({message:'Check your mail for a link to confirm password change',positionY:'bottom',positionX:'left'});
        $state.go('dashboard.container.profile',{id: user.id});
      } else {
        Notification.error({message:'Password Change not Successful',positionX: 'left',positionY:'bottom'});
        return;
      }
    });
  }
})
