const Router = require("express").Router();
const userController = require("../controllers/userController");
const db = require("../models");

// routes that we want to protect
Router.get("/welcome", (req, res) => {
  res.send("Listen to a song and play on piano what you hear.");
});

Router.route("/users").post(userController.createNew);

Router.route("/users/tests").post(userController.addTest);

Router.get("/users", (req, res) => {
  db.User.find({})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

Router.get("/songs", (req, res) => {
  db.Song.find({})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

module.exports = Router;
