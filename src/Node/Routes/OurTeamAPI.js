const express = require('express');
const ourteamrouter = express.Router();
const ourteam = require('../Model/OurTeamModel');

ourteamrouter.get('/ourteam', function(req, res, next){
    ourteam.find({}).then(function(ourteams){
        res.send(ourteams);
    });
});

ourteamrouter.post('/ourteam', function(req, res, next){
    ourteam.create(req.body).then(function(ourteam){
        res.send(ourteam);
    }).catch(next);
});

ourteamrouter.put('/ourteam/:id', function(req, res, next){
    ourteam.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        ourteam.findOne({_id: req.params.id}).then(function(ourteam){
          res.send(ourteam);  
        });
    });
});

ourteamrouter.delete('/ourteam/:id', function(req, res, next){
    ourteam.findByIdAndRemove({_id: req.params.id}).then(function(ourteam){
        res.send(ourteam);
    });
});

module.exports = ourteamrouter;
