"use strict";

module.exports = function(app){
  app.controller('activitiesController', function($scope, $http, auth, $location, $cookies, footer){
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

    $scope.userName = $cookies.userName;
    $scope.getEvents = footer.getEvents;
    $scope.newEvent = footer.newEvent;
    $scope.logout = footer.logout;
    $scope.getActivities = footer.getActivities;

    $scope.isJoined = function(event){
      var i = event.attendees.indexOf($cookies.userName);
      return (i === -1) ? false : true;
    };

    $scope.unJoinEvent = function(event) { //refactor
      var i = event.attendees.indexOf($cookies.userName);
      if (i !== -1){              // Checks to see if user is in attendees array before executing - maybe change this
        event.attendees.splice(i, 1);
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
      }
    };
  });
};
