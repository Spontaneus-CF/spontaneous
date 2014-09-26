'use strict';

require('../../app/js/app.js');
require('angular-mocks');

describe('spontaneousApp', function() {
  var $controllerConstructor;
  var scope;

  beforeEach(angular.mock.module('spontaneousApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a new controller', function(){
    var userController = $controllerConstructor('usersController', {$scope: scope});
    expect(typeof userController).toBe('object');
  });

});
