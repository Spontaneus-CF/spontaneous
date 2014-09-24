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
      var i = event.attendees.indexOf($cookies.firstName);  
      if (i === -1){  
        event.attendees.push($cookies.firstName);
        $http({
          method: 'PUT',
          url:'/api/v_0_0_1/events/' + event._id,
          data: event
        })
        .success(function(data){
          $location.path('/home'); // change path
          console.log(data);
          console.log('success');
        })
        .error(function(data, status){
          console.log('error');
          console.log(data);
          console.log(status);
        });
      }
    };

    $scope.unJoinEvent = function(event) { //refactor
      var i = event.attendees.indexOf($cookies.firstName);
      if (i !== -1){              // Checks to see if user is in attendees array before executing - maybe change this
        event.attendees.splice(i, 1);
        $http({
          method: 'PUT',
          url:'/api/v_0_0_1/events/' + event._id,
          data: event
        })
        .success(function(data){
          $location.path('/home'); // change path
          console.log(data);
          console.log('success');
        })
        .error(function(data, status){
          console.log('error');
          console.log(data);
          console.log(status);
        });
      }
    };
  });
};
