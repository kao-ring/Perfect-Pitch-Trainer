const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema({
  score: {
    type: number,
    required: true,
  },
  // url string for thumbnail image
  date: {
    type: String,
    default: "",
  },
});

const Recipe = mongoose.model("Score", scoreSchema);

module.exports = Score;
