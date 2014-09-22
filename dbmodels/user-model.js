"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.schema({
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
