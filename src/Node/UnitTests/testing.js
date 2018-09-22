const assert = require('assert');
const AboutUs = require('../model/TimeLineModel');

//Describe Tests
// This blocks is for multiple test under describe.
// it() is fr individual component test
describe('CRUD Create tests', function(){
    //Create tests
    it('CRUD C test', function(done){
        //To test if what we want passes 
        var char = new AboutUs({
            title: 'Project A',
            text: 'some text'
        });

        char.save().then(function(){
            assert(char.isNew === false);
            done();
        });
    });

});

