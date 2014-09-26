'use strict';

describe('spontaneousApp', function() {
  var $controllerConstructor;
  var scope;

  beforeEach(angular.mock.module('spontaneousApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a new controller', function(){
    var activitiesController = $controllerConstructor('activitiesController', {$scope: scope});
    expect(typeof activitiesController).toBe('object');
  });
});
