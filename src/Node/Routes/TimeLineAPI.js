const express = require('express');
const timelinesrouter = express.Router();
const timelines = require('../model/TimeLineModel');

timelinesrouter.get('/timeline', function(req, res, next){
    timelines.find({}).then(function(timeline){
        res.send(timeline);
    });
});

timelinesrouter.post('/timeline', function(req, res, next){
    timelines.create(req.body).then(function(timeline){
        res.send(timeline);
    }).catch(next);
});

timelinesrouter.put('/timeline/:id', function(req, res, next){
    timelines.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        timelines.findOne({_id: req.params.id}).then(function(timeline){
          res.send(timeline);  
        });
    });
});

timelinesrouter.delete('/timeline/:id', function(req, res, next){
    timelines.findByIdAndRemove({_id: req.params.id}).then(function(timeline){
        res.send(timeline);
    });
});

module.exports = timelinesrouter;
