'use strict';

angular.module('myApp', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/build/main.html',
        controller: 'MainCtrl'
      })
      .when('/test', {
        templateUrl: 'views/build/test.html',
        controller: 'TestCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      // use the HTML5 History API
      // $locationProvider.html5Mode(true);

  })

  .config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
