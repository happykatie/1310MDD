'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('SparkApp',
      ['SparkApp.config', 'SparkApp.filters', 'SparkApp.services', 'SparkApp.directives', 'SparkApp.mainController', 'firebase']
   )

   // configure views; note the authRequired parameter for authenticated pages
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });
      
      $routeProvider.when('/projectlist', {
         templateUrl: 'partials/project-list.html',
         controller: 'ListCtrl'
      });
      
      $routeProvider.when('/projectdetail', {
         templateUrl: 'partials/project-detail.html',
         controller: 'DetailCtrl'
      });

      $routeProvider.when('/view2', {
         templateUrl: 'partials/view2.html',
         controller: 'MyCtrl2'
      });

      $routeProvider.when('/account', {
         authRequired: true,
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });
      
      $routeProvider.when('/reportproblem', {
         authRequired: true,
         templateUrl: 'partials/reportproblem.html',
         controller: 'ProblemCtrl'
      });
      
      $routeProvider.when('/termspolicies', {
         authRequired: true,
         templateUrl: 'partials/termspolicies.html',
         controller: 'TermsCtrl'
      });
      
      $routeProvider.when('/helpfaq', {
         authRequired: true,
         templateUrl: 'partials/helpfaq.html',
         controller: 'HelpCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/login'});
   }])

   // double-check that the app has been configured
   .run(['FBURL', function(FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      }
   }])

   // establish authentication
   .run(['angularFireAuth', 'FBURL', '$rootScope', function(angularFireAuth, FBURL, $rootScope) {
      angularFireAuth.initialize(FBURL, {scope: $rootScope, name: "auth", path: '/login'});
      $rootScope.FBURL = FBURL;
   }]);