const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: String,
  score: Number,
  scoreCreated: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema({
  user_name: { type: String, unique: true, required: true },

  password: String,
  tests: [testSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
