'use strict';


angular.module('StarCityApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui-notification',
        'angular-loading-bar',
        'cr.acl',
        'angularFileUpload'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // console.log($stateProvider);


        $stateProvider

            .state('dashboard', {
                url: "/dashboard",
                abstract: true,
                templateUrl: 'app/views/dashboard.html',
                controller: 'DashboardCtrl',
                authenticated: true,
                data: {
                    is_granted: ['ROLE_LOGIN']
                }
            })
            .state('dashboard.dbIndex', {
                authenticated: true,
                url: '/index',
                views: {
                    'DashboardView': {
                        templateUrl: 'app/views/dbIndex.html',
                        controller: 'DbindexCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_LOGIN']
                }

            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/views/home.html',
                controller: 'HomeCtrl',
                data: {
                    is_granted: ['ROLE_GUEST']
                }
            })
            .state('preLogin', {
                url: '/processing-user',
                abstract: true,
                templateUrl: 'app/views/PreLogin.html',
                controller: 'PreloginCtrl',
                data: {
                    is_granted: ['ROLE_GUEST']
                }
            })
            .state('preLogin.signin', {
                abstract: true,
                url: '/signin',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/signup.html',
                        controller: 'SigninCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_GUEST']
                }

            })
            .state('preLogin.signin.view', {
                url: '/page',
                views: {
                    'starsView': {
                        templateUrl: 'app/views/stars-signin-cont.html',
                        controller: 'SigninCtrl'
                    },
                    'starMakersView': {
                        templateUrl: 'app/views/starMaker-signin-cont.html',
                        controller: 'SigninCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_GUEST']
                }

            })
            .state('preLogin.stars-signin', {
                url: '/signin/stars',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-signin-form.html',
                        controller: 'SigninCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_GUEST']
                }
            })
            .state('preLogin.starMakers-signin', {
                url: '/signin/star-makers',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/starsMakers-signin-form.html',
                        controller: 'SigninCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_GUEST']
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
            },
            data: {
                is_granted: ['ROLE_GUEST']
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
                },
                data: {
                    is_granted: ['ROLE_GUEST']
                }

            })
            .state('preLogin.stars-form-1', {
                url: '/stars/registration-form/page-1',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-form-page-1.html',
                        controller: 'SignupFormCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_GUEST']
                }

            })
            .state('preLogin.stars-form-2', {
                url: '/stars/registration-form/page-2',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-form-page-2.html',
                        controller: 'SignupFormCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_GUEST']
                }

            })
            .state('preLogin.stars-form-3', {
                url: '/stars/registration-form/page-3',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-form-page-3.html',
                        controller: 'SignupFormCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_GUEST']
                }

            })
            .state('preLogin.starMakers-form', {
                url: '/star-makers/registration-form',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/starMakers-form.html',
                        controller: 'SignupFormCtrl'
                    }
                },
                data: {
                    is_granted: ['ROLE_GUEST']
                }

            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/views/about.html',
                controller: 'AboutCtrl',
                data: {
                    is_granted: ['ROLE_GUEST', "ROLE_LOGIN"]
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'app/views/contact.html',
                controller: 'ContactCtrl',
                data: {
                    is_granted: ['ROLE_GUEST', "ROLE_LOGIN"]
                }
            })

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'app/views/main.html',
                controller: 'MainCtrl',
                data: {
                    is_granted: ['ROLE_GUEST', "ROLE_LOGIN"]
                }
            });

    })



.run(['crAcl', 'Login', '$state', '$rootScope', '$location', function run(crAcl, Login, $state, $rootScope, $location) {
    crAcl.setInheritanceRoles({
        "ROLE_CUSTOMER": ["ROLE_USER"],
        "ROLE_CLIENT": ["ROLE_CUSTOMER", "ROLE_USER"],
        "ROLE_LOGIN": ['ROLE_CUSTOMER', "ROLE_CLIENT"],
        "ROLE_GUEST": ["ROLE_GUEST"]
    });

    $rootScope.$on('$stateChangeStart', function(event, next) {
        if (Login.getUser() && next.url != '/page') {
            crAcl.setRole("ROLE_LOGIN");
            $location.path('/dashboard/index');

        }

        // console.log($rootScope.$watch);
    })

    crAcl.setRedirect("preLogin.signin.view");


}])


// .run(['$cookieStore'], function run($cookieStore) {

// })
