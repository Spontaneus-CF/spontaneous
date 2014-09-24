"use strict";

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

var eventSchema = mongoose.Schema({
  test: {
    eName: String,
    eLocation: String,
    address: String,
    eventTime: String,
    maxNumber: String,
    minNumber: String
  }
});

module.exports = mongoose.model('Event', eventSchema); 
