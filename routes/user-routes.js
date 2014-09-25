"use strict";

var User = require('../dbmodels/user-model');

module.exports = function(app, passport){
  var baseUrl = '/api/v_0_0_1/users';

  app.post(baseUrl, function(req, res){
    User.findOne({'local.email' : req.body.email}, function(err, user){
      if(err) return res.status(500).json(err);
      if(user){
        return res.status(401).json({'msg': 'cannot create user'});
      } else {

        var newUser = new User();
        newUser.local.email = req.body.email;
        newUser.local.password = newUser.generateHash(req.body.password);
        newUser.local.userName = req.body.userName;

        newUser.save(function(err, resUser){
          if (err) return res.status(500).json(err);
          return res.status(200).json({'userName': resUser.local.userName,
                                    'jwt': resUser.createToken(app)});
        });
      }
    });
  });

  app.get(baseUrl, passport.authenticate('local', {session: false}), 
    function(req, res){
      return res.json({'jwt': req.user.createToken(app),
                        'userName': req.user.local.userName});
  });

  app.put(baseUrl + '/:id', jwauth, function(req, res){  // To update email address or password
    var user = req.body;
    delete user._id;
    User.findOneAndUpdate({'_id': req.params.id}, user, function(err, resUser){
      if(err) return res.status(500).json(err);
      return res.status(202).json(resEvent);
    });
  });

};
