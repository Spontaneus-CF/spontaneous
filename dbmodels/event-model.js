"use strict";

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

var eventSchema = mongoose.Schema({
  name: String,
  location: String,
  address: String,
  eventTime: Date,
  maxNumber: Number,
  minNumber: Number
}); 
