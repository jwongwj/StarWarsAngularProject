const mongoose = require('mongoose');

// connect to testaroo database on mongodb
mongoose.connect('mongodb://localhost/ggPushUnitTestDB');

// Listen for successful connection to db (1 time only)
before(function (done) {
    mongoose.connection.once('open', function () {
        console.log('Connection has been made.');
        done();
    }).on('error', function (error) { // for error
        console.log('Connection error: ' + error);
    });
});

//Drop collection before each test
beforeEach(function(done){
    // drop the collection
    mongoose.connection.collections.journeys.drop(function(){
        done();
    })
})
