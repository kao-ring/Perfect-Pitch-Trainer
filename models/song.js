const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notes: [
    {
      midiNumber: Number,
      time: Number,
      duration: Number,
    },
  ],
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
