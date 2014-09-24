'use strict';

var User = require('../dbmodels/user-model');
var jwt = require('jwt-simple');

module.exports = function(app) {
  var jwtauth = {
    auth: function(req, res, next) {
      var token = req.body.jwt || req.headers.jwt;

      var decoded;
      try {
        decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      } catch(err) {
        return res.status(401).json({'msg': 'access denied'});
      }

      User.findOne({'_id': decoded.iss}, function(err, user) {
        if(err) return res.status(500).json(err);

        if(!user) return res.status(401).json({'msg': 'access denied'});

        req.user = user;
        next();
      });
    }
  };

  return jwtauth;
};
