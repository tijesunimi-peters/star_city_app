'use strict';


angular.module('StarCityApp', [
        'ngCookies',
        'ngResource',
        'ngAnimate',
        'ui.grid',
        'ngSanitize',
        'ui.router',
        'ui-notification',
        'angular-loading-bar',
        'cr.acl',
        'ngFileUpload',
        'angularFileUpload'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {


        $stateProvider

            .state('dashboard', {
                url: "/dashboard/:id",
                abstract: true,
                templateUrl: 'app/views/dashboard.html',
                controller: 'DashboardCtrl',
                authenticated: true
            })
            .state('dashboard.dbIndex', {
                authenticated: true,
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
            .state('dashboard.container.auditions', {
                authenticated: true,
                abstract: true,
                url: '/auditions',
                views: {
                    'DB-container': {
                        template: "<div ui-view='auditions-container'></div>",
                        controller: 'AuditionsController'
                    }
                }

            })
            .state('dashboard.container.auditions.index',{
                url:'/index',
                authenticated: true,
                views: {
                    'auditions-container': {
                        templateUrl:'app/views/auditions/index.html'
                    }
                }
            })
            .state('dashboard.container.auditions.new',{
                url:'/add',
                authenticated: true,
                views: {
                    'auditions-container': {
                        templateUrl:'app/views/auditions/new.html'
                    }
                }
            })
            .state('dashboard.container.auditions.view',{
                url:'/view/:audition_id',
                authenticated: true,
                views: {
                    'auditions-container': {
                        templateUrl:'app/views/auditions/view.html'
                    }
                }
            })
            .state('dashboard.container.auditions.mine',{
                url:'/me',
                authenticated: true,
                views: {
                    'auditions-container': {
                        templateUrl:'app/views/auditions/mine.html'
                    }
                }
            })
            .state('dashboard.container.studios', {
                authenticated: true,
                url: '/studios',
                views: {
                    'DB-container': {
                        templateUrl: "app/views/dashboard_pages/studios.html"
                    }
                }

            })
            .state('dashboard.container.blog', {
                authenticated: true,
                url: '/blog',
                views: {
                    'DB-container': {
                        templateUrl: "app/views/dashboard_pages/blog.html"
                    }
                }

            })
            .state('dashboard.container.talent', {
                authenticated: true,
                url: '/talents',
                views: {
                    'DB-container': {
                        templateUrl: "app/views/dashboard_pages/talent.html"
                    }
                }

            })
            .state('dashboard.container.jobs', {
                authenticated: true,
                url: '/jobs',
                views: {
                    'DB-container': {
                        templateUrl: "app/views/dashboard_pages/jobs.html"
                    }
                }

            })
            .state('dashboard.container.equipments', {
                authenticated: true,
                url: '/equipments',
                views: {
                    'DB-container': {
                        templateUrl: "app/views/dashboard_pages/equipments.html"
                    }
                }

            })
            .state('dashboard.container.profile', {
                authenticated: true,
                url: '/profile',
                views: {
                    'DB-container': {
                        templateUrl: "app/views/dashboard_pages/profile.html"
                    }
                }

            })

        .state('dashboard.container.password_reset', {
                authenticated: true,
                url: '/password_reset/verify-email',
                views: {
                    'DB-container': {
                        templateUrl: "app/views/password_reset/index.html",
                        controller: "PasswordResetController"
                    }
                }
            })
            .state('dashboard.container.change_password', {
                authenticated: true,
                url: '/password_reset/change-password',
                views: {
                    'DB-container': {
                        templateUrl: "app/views/password_reset/new_password.html",
                        controller: "PasswordResetController"
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
                abstract: true,
                url: '/star-makers/registration-form',
                views: {
                    'PreLogin': {
                        templateUrl: 'app/views/starMakers-form-cont.html',
                        controller: 'SignupFormCtrl'
                    }
                }

            })
            .state('preLogin.starMakers-form.checkEmail', {
                url: '/checkEmail',
                views: {
                    'starMakersFormView': {
                        templateUrl: 'app/views/starMakers-checkEmail.html'
                    }
                }

            })
            .state('preLogin.starMakers-form.details', {
                url: '/details',
                views: {
                    'starMakersFormView': {
                        templateUrl: 'app/views/starMakers-details.html'
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
            .state('index', {
                url: '/index',
                templateUrl: 'app/views/main.html',
                controller: 'MainCtrl'
            });

        $urlRouterProvider.otherwise('/index');

    })

.config(function($httpProvider) {
    $httpProvider.interceptors.push('jwtInterceptor');
})




.run(function run($window, UserService, $state, $rootScope) {

    $rootScope.$on('$stateChangeSuccess', function(event, next) {
        var user = UserService.getUser();
        $rootScope.rootPage = next.name;

        if (next.authenticated && /(dashboard)/.test(next.name)) {
            if (!user) {
                $state.go('preLogin.signin.view');
            }

        }

        if ((!next.authenticated || typeof next.authenticated === 'undefined') && typeof user !== 'undefined') {

            if (user && !/(dashboard)/.test(next.name)) {

                $state.go('dashboard.dbIndex', { id: user.id });
            }
        }


    })




})



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
