'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../dbmodels/user-model');

module.exports = function(passport) {
  passport.use('local', new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({'local.email': email}, function(err, user) {
      if(err) return done(err);
      
      if(!user) return done(null, false);

      if(!user.validPassword(password)) return done(null, false);

      return done(null, user);
    });
  }));
};
