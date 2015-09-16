var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/track_app");

module.exports.Track = require("./track");