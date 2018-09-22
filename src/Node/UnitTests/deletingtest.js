const assert = require('assert');
const AboutUs = require('../model/TimeLineModel');

//Describe Tests
// This blocks is for multiple test under describe.
// it() is fr individual component test
describe('Deleting records', function(){
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

    it('Delete one record from db', function(done){
        AboutUs.findOneAndRemove({title: 'Project A'}).then(function(){
            AboutUs.findOne({title:'Project A'}).then(function(result){
                assert(result === null);
                done();
            });
        });
    });

});

