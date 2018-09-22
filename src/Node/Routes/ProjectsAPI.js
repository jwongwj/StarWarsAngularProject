const express = require('express');
const projectsrouter = express.Router();
const projects = require('../Model/ProjectsModel');

projectsrouter.get('/projects', function(req, res, next){
    projects.find({}).then(function(project){
        res.setHeader('Content-Type', 'application/json');
        res.send(project);
    });
});

projectsrouter.post('/projects', function(req, res, next){
    projects.create(req.body).then(function(project){
        res.send(project);
    }).catch(next);
});

projectsrouter.put('/projects/:id', function(req, res, next){
    projects.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        projects.findOne({_id: req.params.id}).then(function(project){
          res.send(project);  
        });
    });
});

projectsrouter.delete('/projects/:id', function(req, res, next){
    projects.findByIdAndRemove({_id: req.params.id}).then(function(project){
        res.send(project);
    });
});

module.exports = projectsrouter;
