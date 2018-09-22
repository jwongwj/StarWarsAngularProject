const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UrlSchema = require('./UrlSchema');

// Create schemea & model (Note: first letter caps means its is a class)
const OurTeamSchema = new Schema({
    // not sure how to save an image..
    name: String,
    urls: [UrlSchema],
    desc: String,
    image: String
});

const OurTeam = mongoose.model('ourteam', OurTeamSchema);

// this is equivalant to public methods
module.exports = OurTeam;