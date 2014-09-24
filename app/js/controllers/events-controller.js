"use strict";

module.exports = function(app){
  app.controller('eventsController', function($scope, $http, $location, auth, $cookies){
    $scope.submitForm = function(){
      if (auth.sendJWT() === 'noauth') return false;
      $scope.event.attendees = ($cookies.firstName);
      $http({
        method: 'POST',
        url: '/api/v_0_0_1/events',
        data: $scope.event
      })
      .success(function(data){
        $location.path('/home');
        console.log('success');
      })
      .error(function(data){
        console.log('error');
        console.log(data);
      });
    };
  });
};
