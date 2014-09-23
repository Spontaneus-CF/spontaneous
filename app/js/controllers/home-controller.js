"use strict";

module.exports = function(app){
  app.controller('homeController', function($scope, $cookies, $location){
    $scope.logout = function(){
      $cookies.jwt = null;
      $location.path('/signin'); 
    };
  });
};
