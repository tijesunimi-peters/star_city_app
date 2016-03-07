<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width initial-scale=1.0">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css(.tmp) styles/main.css -->
    <link rel="stylesheet" href="{{asset('app/bower_components/angular-loading-bar/build/loading-bar.min.css')}}">
    <link rel="stylesheet" href="{{asset('app/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css')}}">
    <link rel="stylesheet" href="{{asset('app/styles/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('app/styles/flexboxgrid.min.css')}}">
    <link rel="stylesheet" href="{{asset('app/styles/component.css')}}">
    <link rel="stylesheet" href="{{asset('app/styles/animate.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('app/styles/css/effect1.css')}}" />
    <link rel="stylesheet" href="{{asset('app/styles/CustomFileInputs/css/component.css')}}">
    <link rel="stylesheet" href="{{asset('app/styles/cs-select.css')}}">
    <link rel="stylesheet" href="{{asset('app/styles/cs-skin-slide.css')}}">
    <link rel="stylesheet" href="{{asset('app/styles/main.css')}}">
    
    <!-- endbuild -->
    <script src="{{asset('styles/js/modernizr.custom.js')}}"></script>
    <script type="text/javascript">
        window.fbAsyncInit = function() {
        FB.init({
          appId      : 985678661468848,
          xfbml      : true,
          version    : 'v2.5'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>
</head>

<body ng-app="StarCityApp">
    <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <!--[if lt IE 9]>
      <script src="bower_components/es5-shim/es5-shim.js"></script>
      <script src="bower_components/json3/lib/json3.min.js"></script>
    <![endif]-->
    <!-- Add your site or application content here -->
   <!--  <div id="loader-wrapper" class="loader">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
    </div> -->

    <div ui-view="" class="animated fadeIn"></div>





    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
    <script>
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-XXXXX-X');
    ga('send', 'pageview');
    </script>
    <script src="{{asset('app/bower_components/jquery/jquery.js')}}"></script>
    <script src="{{asset('app/bower_components/angular/angular.min.js')}}"></script>
    <!-- build:js scripts/modules.js -->
    <script src="{{asset('app/bower_components/angular-resource/angular-resource.js')}}"></script>
    <script src="{{asset('app/bower_components/angular-cookies/angular-cookies.js')}}"></script>
    <script src="{{asset('app/bower_components/angular-sanitize/angular-sanitize.js')}}"></script>
    <script src="{{asset('app/bower_components/angular-ui-router/release/angular-ui-router.js')}}"></script>
    <script src="{{asset('app/bower_components/angular-loading-bar/build/loading-bar.min.js')}}"></script>
    <script src="{{asset('app/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js')}}"></script>
    <script src="{{asset('app/bower_components/cr-acl/cr-acl.js')}}"></script>
    <script src="{{asset('app/bower_components/ng-file-upload/ng-file-upload.min.js')}}"></script>
    <script src="{{asset('app/bower_components/ng-file-upload/ng-file-upload-shim.min.js')}}"></script>
    <script src="{{asset('app/bower_components/angular-file-upload/dist/angular-file-upload.min.js')}}"></script>
    <!-- endbuild -->
    <!-- build:js({.tmp,app}) scripts/scripts.js -->
    <script src="{{asset('app/scripts/app.js')}}"></script>
    <script src="{{asset('app/styles/CustomFileInputs/js/custom-file-input.js')}}"></script>
    <script src="{{asset('app/scripts/classie.js')}}"></script>
    <script src="{{asset('app/scripts/selectFx.js')}}"></script>
    <!-- // <script src="scripts/controllers/main.js"></script> -->
    <script src="{{asset('app/scripts/controllers/main.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/home.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/signin.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/signup.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/about.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/contact.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/dashboard.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/dbIndex.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/PreLogin.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/signup-form.js')}}"></script>
    <script src="{{asset('app/scripts/controllers/AuthController.js')}}"></script>
    <script src="{{asset('app/scripts/services/Login.js')}}">
    </script>
    <script src="{{asset('app/scripts/services/RegistrationService.js')}}">
    </script>
    <!-- endbuild -->
   
    <script>
        (function() {
            [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {    
                new SelectFx(el);
            } );
        })();
    </script>
</body>

</html>
