"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    friends: Array
  },
  twitter: {

  },

  facebook: {

  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.createToken = function(app) {
  var expires = moment().add(7, 'days').valueOf();
  var self = this;
  var token = jwt.encode({
    iss: self._id,
    expires: expires
  }, app.get('jwtTokenSecret'));
  return token;
};

module.exports = mongoose.model("User", userSchema);
