'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var passport = require('passport');
var app = express();

var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/spontaneous-dev');

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));

app.set('jwtTokenSecret', process.env.JWT_SECRET || 'developmentsecret');
app.set('secret', process.env.SECRET || 'developmentsecret');

app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwtauth')(app);

app.use(bodyparser.json());
require('./routes/user-routes')(app, passport);
require('./routes/event-routes')(app, jwtauth.auth);

var server = http.createServer(app);

server.listen(port, function() {
  console.log('server running on port ' + port);
});
