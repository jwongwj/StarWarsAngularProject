const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectImgSchema = new Schema({
    imgfile: String,
    title: String,
    desc: String
})

// Create schemea & model (Note: first letter caps means its is a class)
const ProjectSchema = new Schema({
    sn: Number,
    category: String,
    name: String,
    title: String,
    description: String,
    slidesimgs: [ProjectImgSchema]
});

const Project = mongoose.model('projects', ProjectSchema);

// this is equivalant to public methods
module.exports = Project;
