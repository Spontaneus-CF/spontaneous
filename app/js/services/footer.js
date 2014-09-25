"use strict";

module.exports = function(app){
  app.factory('footer', function($location, $cookies){
    
    var footer = {
      getEvents: function(){
        $location.path('/events');
      },

      newEvent: function(){
        $location.path('/new-event');
      },

      logout: function(){
        $cookies.jwt = null;
        $location.path('/signin'); 
      }
    };
    return footer;
  });
};
