"use strict";

module.exports = function(app){
  app.controller('myEvents', function($scope, $http, auth, $location){
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
      $http({
        method: 'PUT',
        url:'/api/v_0_0_1/events/' + event._id,
        data: $scope.event,
      })
      .success(function(data){
        data.attendees.push('test');
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
