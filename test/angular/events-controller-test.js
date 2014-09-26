'use strict';

describe('spontaneousApp', function() {
  var $controllerConstructor;
  var scope;
  var $httpBackend;

  beforeEach(angular.mock.module('spontaneousApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a new controller', function(){
    var eventsController = $controllerConstructor('eventsController', {$scope: scope});
    expect(typeof eventsController).toBe('object');
  });

  describe('rest request', function(){
    var ctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/v_0_0_1/events').respond(200, [{'eName': 'test event'}]);
    }));
    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should make a GET request', function(){
      ctrl = $controllerConstructor('eventsController', {$scope: scope});
      $httpBackend.flush();
      expect(Array.isArray(scope.events)).toBeTruthy();
      expect(scope.events[0].eName).toEqual('test event');
    });
  });
});
