'use strict';

require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var spontaneousApp = angular.module('spontaneousApp', ['ngRoute', 'ngCookies', 'base64']);

//controllers
require('./controllers/users-controller')(spontaneousApp);
require('./controllers/events-controller')(spontaneousApp);
require('./controllers/new-event-controller')(spontaneousApp);
require('./controllers/activities-controller')(spontaneousApp);

//Directives
require('./directives/validate-password.js')(spontaneousApp);

//Services
require('./services/auth')(spontaneousApp);
require('./services/footer')(spontaneousApp);

spontaneousApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/signin', {
    templateUrl: 'views/users.html',
    controller: 'usersController'
  })
  .when('/new-event', {
    templateUrl: 'views/event-form.html',
    controller: 'newEventController'
  })
  .when('/events', {
    templateUrl: 'views/events.html',
    controller: 'eventsController'
  })
  .when('/activities', {
    templateUrl: 'views/activities.html',
    controller: 'activitiesController'
  })
  .when('/unauthorized', {
    templateUrl: 'views/unauth.html'
  })
  .otherwise({
    redirectTo:'/signin'
  });
}]);


