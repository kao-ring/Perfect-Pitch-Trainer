const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notes: [
    {
      _id: false,
      midiNumber: Number,
      time: Number,
      duration: Number,
    },
  ],
});
//testest
const Song = mongoose.model("Song", songSchema);

module.exports = Song;
