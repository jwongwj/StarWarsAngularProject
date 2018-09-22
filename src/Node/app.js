// Start program by running 2 Command prompt 
    // a) MongoDB - e:/mongodb/server/3.6/bin/mongod.exe
    // b) Start up server - nodemon mainnode.js
    // z) To run test - npm run test
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

// set up express app
const app = express();
var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus:200
}

app.use(cors(corsOptions));
//app.response.set('Access-Control-Allow-Origin', 'domain.tld');

// connect to mongodb (Creates database if not exist)
mongoose.connect('mongodb://localhost/ggPushWebDB');
mongoose.Promise = global.Promise; //dont know what simi deprecated. like exception handling


const server = app.listen(process.env.port || 3000, listening);

// const data = fs.readFileSync('HomepageJSON.json');
// const words = JSON.parse(data);

// #region Express MiddleWare - app.use (Codes must be in sequence)
//For Front end
app.use(express.static('Public'));

//Text Display - parses text as json and expose via req.body
app.use(bodyParser.json());

//Route Handling - initialize routes, adding api in front of all
app.use('/api', require('./Routes/OurTeamAPI'));
app.use('/api', require('./Routes/ProjectsAPI'));
app.use('/api', require('./routes/TimeLineAPI'));

//Exception Handling - This is the "Catch block"
app.use(function(err, req, res, next){
   // console.log(err);
   res.status(422).send({error: err.message});
});

// #endregion

// Redundant. Just for showing "success" message on my console with nodemon
function listening(){
    console.log("Results displayed on localhost:" + server.address().port);
}

