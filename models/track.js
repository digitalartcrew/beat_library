var mongoose = require('mongoose');

var trackSchema = new mongoose.Schema({
                   title: {type: String, required: true},
                   author: String,
                   url: String,
                   year: Number
                  });

var Track = mongoose.model("Track", trackSchema);

module.exports = Track;