'use strict';

require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var spontaneousApp = angular.module('spontaneousApp', ['ngRoute', 'ngCookies', 'base64']);

require('./controllers/user-controller')(spontaneousApp);

spontaneousApp.config([$routeProvider, function($routeProvider){
  $routeProvider
  .when('/signin', {
    templateUrl: 'views/user/users.html',
    controller: 'usersController'
  })

  .otherwise({
    redirectTo:'/signin'
  });
}]);

