"use strict";

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

var eventSchema = mongoose.Schema({
    eName: String,
    eLocation: String,
    address: String,
    eventTime: String,
    maxNumber: String,
    minNumber: String,
    attendees: [String],
    owner: String
});

module.exports = mongoose.model('Event', eventSchema);
