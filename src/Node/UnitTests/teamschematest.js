const assert = require('assert');
const mongoose = require('mongoose');
const ourteam = require('../model/OurTeamModel');

describe('OurTeamDB test', function(){

    beforeEach(function(done){
        mongoose.connection.db.dropDatabase(done);
    });

    it('Creates member', function(done){
        var jayden = new ourteam({
            image: 'image 1',
            name: 'Jayden Wong',
            age: 25,
            desc: 'Doing back-end',
            icon: 'not sure?',
            url: [{facebook: 'jwongwj', linkedin: 'jwongwj', github: 'jwongwj'}]
        });

        jayden.save().then(function(){
            ourteam.findOne({name:'Jayden Wong'}).then(function(result){
                assert(result.url.length === 1);
                done();
            });
        });
    });
});