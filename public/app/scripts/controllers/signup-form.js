'use strict';

angular.module('StarCityApp')
    .controller('SignupFormCtrl', function($scope, $state,Registrationservice,NotificationService) {
        $scope.emailExists = false;

        $scope.getStarsForm = function() {
            $state.go('preLogin.stars-form-1');
        }

        $scope.continueAsStarMaker = function() {
          $state.go('preLogin.starMakers-form.checkEmail');
        }

        $scope.getStarMakersForm = function() {
          $state.go('preLogin.starMakers-form.checkEmail');
        }

        $scope.starMakersPage2 = function() {
            Registrationservice.checkEmailSM($scope.starmaker).then(function(res) {
                if(res.status !== 200) {
                    console.log(res.data);
                    NotificationService.error("Error Occured "+res.status+" Pls try Again");
                }

                if(res.data.code === 'error') {
                    NotificationService.success("Account with email Exists as Star; Continuing to add Star Maker");
                } else if (res.data.code === 'success') {
                    NotificationService.success("Email Verified");
                    $state.go('preLogin.starMakers-form.details');
                }
            })
        }

        $scope.starMakerSubmit = function() {
            Registrationservice.starMakerReg($scope.starmaker).then(function(res) {
                if (res.data.code === 'error') {
                    NotificationService.error(res.data.response);
                    return;
                } else if (res.data.code === 'success') {
                    NotificationService.success(res.data.response);
                    $state.go('preLogin.signin.view');
                }
            });
        }

    });
