'use strict';

require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var spontaneousApp = angular.module('spontaneousApp', ['ngRoute', 'ngCookies', 'base64']);

//controllers
require('./controllers/users-controller')(spontaneousApp);
require('./controllers/home-controller')(spontaneousApp);

//Directives
require('./directives/validate-password.js')(spontaneousApp);

spontaneousApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/home', {
    templateUrl: 'home.html',
    controller: 'homeController'
  })
  .when('/signin', {
    templateUrl: 'users.html',
    controller: 'usersController'
  })

  .otherwise({
    redirectTo:'/signin'
  });
}]);


