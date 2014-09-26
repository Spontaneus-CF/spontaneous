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
    var newEventController = $controllerConstructor('newEventController', {$scope: scope});
    expect(typeof newEventController).toBe('object');
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

    it('should be able to create a new event', function() {
      $httpBackend.expectPOST('/api/v_0_0_1/events').respond(200, {'eName': 'test event'});
      ctrl = $controllerConstructor('eventsController', {$scope: scope});
      scope.newEvent = {'eName': 'test event'};
      scope.submitForm();
      $httpBackend.flush();
    });
  });
});
