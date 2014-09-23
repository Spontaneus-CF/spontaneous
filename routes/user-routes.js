"use strict";

var User = require('../dbmodels/user-model');

module.exports = function(app, passport){
  var baseUrl = '/api/v_0_0_1/users';

  app.post(baseUrl, function(req, res){
    User.findOne({'local.email' : req.body.email}, function(err, user){
      if(err) return res.status(500).json(err);

      if(user) return res.status(401).json({'msg': 'cannot create user'});
    });

    var newUser = new User();
    newUser.local.email = req.body.email;
    newUser.local.password = newUser.generateHash(req.body.password);
    newUser.local.firstName = req.body.firstName;
    newUser.local.lastName = req.body.lastName;

    newUser.save(function(err, resUser){
      if (err) return res.status(500).json(err);
      return res.status(200).json({'jwt': resUser.createToken(app)});
    });
  });

  app.get(baseUrl, passport.authenticate('local', {session: false}),
    function(req, res){
      return res.json({'jwt': req.user.createToken(app)});
    });
};
