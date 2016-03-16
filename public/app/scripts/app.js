'use strict';


angular.module('StarCityApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui-notification',
        'angular-loading-bar',
        'cr.acl',
        'ngFileUpload',
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
                authenticated: true
            })
            .state('dashboard.dbIndex', {
                authenticated: true,
                // abstract: true,
                url: '/index',
                views: {
                    'DashboardView': {
                        templateUrl: 'app/views/dbIndex.html',
                        controller: 'DbindexCtrl'
                    }
                }
            })
            .state('dashboard.container', {
                authenticated: true,
                url: '/c',
                abstract: true,
                views: {
                    'DashboardView': {
                        template: "<div ui-view='DB-container'></div>"
                    }
                }
            })
            .state('dashboard.container.auditions',{
                authenticated: true,
                url: '/auditions',
                views: {
                    'DB-container': {
                        template: "<div class='page-header'><h1>Auditions</h1><small>This is the auditions View</small></div>"
                    }
                }

            })
            .state('dashboard.container.studios',{
                authenticated: true,
                url: '/studios',
                views: {
                    'DB-container': {
                        template: "<div class='page-header'><h1>Studio/Set</h1><small>This is the studio/set View</small></div>"
                    }
                }

            })
            .state('dashboard.container.blog',{
                authenticated: true,
                url: '/blog',
                views: {
                    'DB-container': {
                        template: "<div class='page-header'><h1>Blog</h1><small>This is the blog View</small></div>"
                    }
                }

            })
            .state('dashboard.container.talent',{
                authenticated: true,
                url: '/talents',
                views: {
                    'DB-container': {
                        template: "<div class='page-header'><h1>Talents</h1><small>This is the talents View</small></div>"
                    }
                }

            })
            .state('dashboard.container.jobs',{
                authenticated: true,
                url: '/jobs',
                views: {
                    'DB-container': {
                        template: "<div class='page-header'><h1>Jobs</h1><small>This is the jobs View</small></div>"
                    }
                }

            })
            .state('dashboard.container.equipments',{
                authenticated: true,
                url: '/equipments',
                views: {
                    'DB-container': {
                        template: "<div class='page-header'><h1>Equipment</h1><small>This is the equipment View</small></div>"
                    }
                }

            })
            .state('dashboard.container.profile',{
                authenticated: true,
                url: '/profile',
                views: {
                    'DB-container': {
                        template: "<div class='page-header'><h1>Profile</h1><small>This is the Profile View</small></div>"
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
                        templateUrl: 'app/views/stars-signin-cont.html',
                        controller: 'SigninCtrl'
                    },
                    'starMakersView': {
                        templateUrl: 'app/views/starMaker-signin-cont.html',
                        controller: 'SigninCtrl'
                    }
                }

            })
            .state('preLogin.stars-signin', {
                url: '/signin/stars',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-signin-form.html',
                        controller: 'SigninCtrl'
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                controller: 'SigninCtrl'
            })
            .state('preLogin.starMakers-signin', {
                url: '/signin/star-makers',
                views: {
                    'PreLogin': {
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
            .state('preLogin.stars-form-1', {
                url: '/stars/registration-form/page-1',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-form-page-1.html',
                        controller: 'SignupFormCtrl'
                    }
                }

            })
            .state('preLogin.stars-form-2', {
                url: '/stars/registration-form/page-2',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-form-page-2.html',
                        controller: 'SignupFormCtrl'
                    }
                }

            })
            .state('preLogin.stars-form-3', {
                url: '/stars/registration-form/page-3',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/stars-form-page-3.html',
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



.run(['Login', '$state', '$rootScope', '$location', '$cookies', function run(Login, $state, $rootScope, $location, $cookies) {

    $rootScope.$on('$stateChangeSuccess', function(event, next) 
    {   
        $rootScope.rootPage = next.name;
        if(next.authenticated && /(dashboard)/.test(next.name) ) 
        {
            if(!Login.getUser()) 
            {
                $state.go('preLogin.signin.view');
            }
        } 

        if(!next.authenticated || typeof next.authenticated === 'undefined') 
        {
            
            if(Login.getUser() && !/(dashboard)/.test(next.name)) 
            {
                $state.go('dashboard.dbIndex');
            }
        }


    })



}])


.directive('ngThumb', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
});
