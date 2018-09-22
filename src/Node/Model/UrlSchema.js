const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    url: String,
    name: String
});

module.exports = UrlSchema;