"use strict";

module.exports = function(app){
  app.controller('homeController', function($scope, $cookies, $location, auth){
    $scope.checkAuth = function(){
      if (auth.sendJWT() === 'noauth') {
        $location.path('/unauthorized');
        return;
      }
      console.log($cookies.jwt);
    };

    $scope.checkAuth();

    $scope.newEvent = function(){
      $location.path('/new-event');
    };

    $scope.logout = function(){
      $cookies.jwt = null;
      $location.path('/signin'); 
    };
  });
};
