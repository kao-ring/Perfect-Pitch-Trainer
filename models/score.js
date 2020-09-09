const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  // url string for thumbnail image
  date: {
    type: String,
    default: "",
  },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
