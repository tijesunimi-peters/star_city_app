"use strict";

/**
 * StarCityApp Module
 *
 * Description
 */
angular.module('StarCityApp')
    .service('UserService', function($window) {
        var _ = {};
        var user = JSON.parse($window.sessionStorage.getItem('userData'));

        _.getUser = function() {
            return user;
        }

        _.getUserType = function() {
            return user.type;
        }

        _.setUserData = function(data, userType) {
            var user = {};
            user = data.profile;
            user.email = data.user.email;
            user.username = data.user.name;
            user.roles = data.profile.roles;
            user.token = data.token;
            user.type = userType;
            $window.sessionStorage.setItem('userData', JSON.stringify(user));
            $window.location.reload();
        }

        _.getId = function() {
            return user.id;
        }

        return _;
    });
