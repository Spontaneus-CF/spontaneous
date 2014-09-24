'use strict';

require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var spontaneousApp = angular.module('spontaneousApp', ['ngRoute', 'ngCookies', 'base64']);

//controllers
require('./controllers/users-controller')(spontaneousApp);
require('./controllers/home-controller')(spontaneousApp);
require('./controllers/events-controller')(spontaneousApp);
require('./controllers/myEvents')(spontaneousApp);

//Directives
require('./directives/validate-password.js')(spontaneousApp);

//Services
require('./services/auth')(spontaneousApp);

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
  .when('/new-event', {
    templateUrl: 'event-form.html',
    controller: 'eventsController'
  })
  .when('/events', {
    templateUrl: 'events.html',
    controller: 'myEvents'
  })
  .when('/unauthorized', {
    templateUrl: 'unauth.html'
  })
  .otherwise({
    redirectTo:'/signin'
  });
}]);


