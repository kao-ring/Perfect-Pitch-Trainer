const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  song: {
    midiNumber: Number,
    time: Number,
    duration: Number,
  },

  level: {
    type: String,
    default: "",
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
