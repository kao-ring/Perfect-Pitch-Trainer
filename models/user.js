const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({ title: String, pass: Boolean });

const userSchema = new Schema({
  user_name: String,
  password: String,
  tests: [testSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
