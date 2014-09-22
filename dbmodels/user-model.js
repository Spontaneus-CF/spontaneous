"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  twitter: {

  },

  facebook: {

  }
});

module.exports = mongoose.model("User", userSchema);
