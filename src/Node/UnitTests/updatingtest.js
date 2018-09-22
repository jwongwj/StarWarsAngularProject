const assert = require('assert');
const AboutUs = require('../model/TimeLineModel');

//Describe Tests
// This blocks is for multiple test under describe.
// it() is fr individual component test
describe('Updating records', function(){
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

    it('Update one record from db', function(done){
        AboutUs.findOneAndUpdate({title:'Project A'}, {text:'updated test'}).then(function(){
            AboutUs.findOne({_id: char._id}).then(function(result){
                assert(result.text === 'updated test');
                done();
            });
        });
    });

});

