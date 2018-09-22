const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UrlSchema = require('./UrlSchema');

// Create schemea & model (Note: first letter caps means its is a class)

const TimeLineSchema = new Schema({
    date: Date,
    title: String,
    desc: String,
    icon: String,
    tags: [String],
    urls: [UrlSchema] 
});

const TimeLine = mongoose.model('journey', TimeLineSchema);

// this is equivalant to public methods
module.exports = TimeLine;