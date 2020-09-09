const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songsSchema = new mongoose.Schema({
  song: {
    type: String,
    required: true,
  },
  // url string for thumbnail image
  level: {
    type: Number,
    default: "",
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
