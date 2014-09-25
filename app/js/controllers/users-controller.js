'use strict';

module.exports = function(app) {
  app.controller('usersController', function($scope, $http, $cookies, $base64, $location){
    if($location.path() === '/signout') $cookies.jwt = null;
    if(!$cookies.jwt || $cookies.jwt.length >=10) return $location.path('/events');

    if($location.path() === '/signin') $scope.newuser = true;

    $scope.signin = function() {
      $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
      $http({
        method: 'GET',
        url: '/api/v_0_0_1/users'
      })
      .success(function(data){
        $cookies.jwt = data.jwt;
        $cookies.userName = data.userName;
        $location.path('/events');
        console.log('success');
      })
      .error(function(data){
        console.log('error');
        console.log(data);
      });
    };

    $scope.validatePassword = function() {
      if (!$scope.user.password) return true;
      return $scope.user.password === $scope.user.passwordConfirmation;
    };

    $scope.createNewUser = function() {
      $http({
        method: 'POST',
        url: '/api/v_0_0_1/users',
        data: $scope.user
      })
      .success(function(data){
        $cookies.jwt = data.jwt;
        $cookies.userName = data.userName;
        $location.path('/events'); //Specify needed from above
        console.log('success');
      })
      .error(function(data){
        console.log('error');
        console.log(data);
      });
    };
  });
};

