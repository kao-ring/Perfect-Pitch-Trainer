const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("./authentication/passport.js");
const authRoutes = require("./authentication/authRoutes.js");

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/perfectpitch",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

// Use apiRoutes
app.use("/api", passport.authenticate("jwt", { session: false }), apiRoutes);
app.use("/auth", authRoutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

//What I need is...

//dependancies
//setup the port and the express app
//setup mongoDB
//middlewaews for accepting post requests
//routes
//start server
