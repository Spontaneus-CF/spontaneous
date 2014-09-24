"use strict";

var Event = require('../dbmodels/event-model');

module.exports = function(app, jwtauth){
  var baseUrl = '/api/v_0_0_1/events';

  app.get(baseUrl, jwtauth, function(req, res){
    Event.find({}, function(err, events){
      if (err) res.status(500).json(err);
      return res.send(events);
    });
  });

  app.post(baseUrl, jwtauth, function(req, res){
    var newEvent = new Event();
    newEvent.test.eLocation = req.body.eLocation;
    newEvent.test.eName = req.body.eName;
    newEvent.test.eventTime = req.body.eventTime;
    newEvent.test.address = req.body.location;
    newEvent.test.maxNumber = req.body.maxNumber;
    newEvent.test.minNumber = req.body.minNumber;

    newEvent.save(function(err, resEvent){
      if (err) return res.status(500).json(err);
      return res.send(resEvent);
    });
  });

  app.get(baseUrl + '/:id', jwtauth, function(req, res){
    Event.findOne({'_id': req.params.id}, function(err, resEvent){
      if (err) return res.status(500).json(err);
      return res.json(resEvent);
    });
  });

  app.put(baseUrl + '/:id', jwtauth, function(req, res){
    var event = req.body;
    delete event._id;
    Event.findOneandUpdate({'_id': req.params.id}, event, function(err, resEvent){
      if (err) return res.status(500).json(err);
      return res.status(202).json(resEvent);
    });
  });

  app.delete(baseUrl + '/:id', jwtauth, function(req, res){
    Event.remove({'_id': req.params.id}, function(err, resEvent){
      if(err) return res.status(500).json(err);
      return res.status(200).json({'msg': "Event deleted"});
    });
  });
};
