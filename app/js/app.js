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
require('./services/footer')(spontaneousApp);

spontaneousApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  // .when('/home', {
  //   templateUrl: 'views/home.html',
  //   controller: 'homeController'
  // })
  .when('/signin', {
    templateUrl: 'views/users.html',
    controller: 'usersController'
  })
  .when('/new-event', {
    templateUrl: 'views/event-form.html',
    controller: 'eventsController'
  })
  .when('/events', {
    templateUrl: 'views/events.html',
    controller: 'myEvents'
  })
  .when('/unauthorized', {
    templateUrl: 'views/unauth.html'
  })
  .otherwise({
    redirectTo:'/signin'
  });
}]);


