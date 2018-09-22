const assert = require('assert');
const AboutUs = require('../model/TimeLineModel');

//Describe Tests
// This blocks is for multiple test under describe.
// it() is fr individual component test
describe('Finding records', function(){
    var char;

    beforeEach(function(done){
        char = new AboutUs({
            title: 'Project A',
            text: 'some text'
        });
    
        char.save().then(function(){
            assert(char.isNew === false);
            done();
        });
    });

    it('Find one record from db', function(done){
        //To test if what we want passes 
        AboutUs.findOne({title: 'Project A'}).then(function(result){
            assert(result.title === 'Project A');
            done();
        });
    });

    it('Find one record by ID from db', function(done){
        //To test if what we want passes 
        AboutUs.findOne({_id: char._id}).then(function(result){
            assert(result._id.toString() === char._id.toString());
            done();
        });
    });

});

