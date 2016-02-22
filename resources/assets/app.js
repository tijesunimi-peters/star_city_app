'use strict';


angular.module('StarCityApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'angular-loading-bar'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //console.log($stateProvider);


        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: 'app/views/authView.html',
                controller: 'AuthcontrollerCtrl as auth'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'app/views/userView.html',
                controller: 'UsercontrollerCtrl as user'
            })

        .state('dashboard', {
                url: "/dashboard",
                abstract: true,
                templateUrl: 'app/views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('dashboard.dbIndex', {
                url: '/index',
                views: {
                    'DashboardView': {
                        templateUrl: 'app/views/dbIndex.html',
                        controller: 'DbindexCtrl'
                    }
                }

            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/views/home.html',
                controller: 'HomeCtrl'
            })
            .state('preLogin', {
                url: '/processing-user',
                abstract: true,
                templateUrl: 'app/views/PreLogin.html',
                controller: 'PreloginCtrl'
            })
            .state('preLogin.signin', {
                abstract: true,
                url: '/signin',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/signup.html',
                        controller: 'SigninCtrl'
                    }
                }

            })
            .state('preLogin.signin.view', {
                url: '/page',
                views: {
                    'starsView': {
                        templateUrl: 'app/views/stars-signin-form.html',
                        controller: 'SigninCtrl'
                    },
                    'starMakersView': {
                        templateUrl: 'app/views/starsMakers-signin-form.html',
                        controller: 'SigninCtrl'
                    }
                }

            })
            .state('preLogin.signup', {
                abstract: true,
                url: '/signup',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/signup.html',
                        controller: 'SignupCtrl'
                    }
                }

            })

        .state('preLogin.signup.view', {
                url: '/page',
                views: {
                    'starsView': {
                        templateUrl: 'app/views/stars-cont.html',
                        controller: 'SignupFormCtrl'
                    },
                    'starMakersView': {
                        templateUrl: 'app/views/starMakers-cont.html',
                        controller: 'SignupFormCtrl'
                    }
                }

            })
            .state('preLogin.stars-form', {
                url: '/stars/registration-form',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-form.html',
                        controller: 'SignupFormCtrl'
                    }
                }

            })
            .state('preLogin.starMakers-form', {
                url: '/star-makers/registration-form',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/starMakers-form.html',
                        controller: 'SignupFormCtrl'
                    }
                }

            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/views/about.html',
                controller: 'AboutCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'app/views/contact.html',
                controller: 'ContactCtrl'
            })

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'app/views/main.html',
                controller: 'MainCtrl'
            });

    })
    
