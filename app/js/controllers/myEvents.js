"use strict";

module.exports = function(app){
  app.controller('myEvents', function($scope, $http, auth, $location, $cookies){
    $scope.getMyEvents = function(){
      if (auth.sendJWT() === 'noauth') return false;
      $http({
        method: 'GET',
        url: '/api/v_0_0_1/events',
      })
      .success(function(data){
        $scope.events = data;
        console.log('success');
      })
      .error(function(data, status){
        console.log('error');
        console.log(data);
        console.log(status);
      });
    };
    $scope.getMyEvents();

    $scope.joinEvent = function(event) {
      event.attendees.push($cookies.userName);
      $http({
        method: 'PUT',
        url:'/api/v_0_0_1/events/' + event._id,
        data: event
      })
      .success(function(data){
        console.log(data);
        console.log('success');
      })
      .error(function(data, status){
        console.log('error');
        console.log(data);
        console.log(status);
      });
    };
  });
};
