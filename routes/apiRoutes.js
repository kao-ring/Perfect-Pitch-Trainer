const Router = require("express").Router();
const userController = require("../controllers/userController");
const db = require("../models");

// routes that we want to protect
Router.get("/welcome", (req, res) => {
  res.send("welcome");
});

Router.route("/users").post(userController.createNew);

Router.route("/users/tests").post(userController.addTest);

Router.get("/users/:user", (req, res) => {
  db.User.findOne({ user_name: req.params.user })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});
Router.get("/users", (req, res) => {
  db.User.find({})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

Router.put("/users/:id", (req, res) => {
  db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

Router.get("/songs", (req, res) => {
  db.Song.find({})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

Router.post("/songs", (req, res) => {
  db.Song.create(req.body)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

Router.put("/songs/:id", (req, res) => {
  db.Song.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

Router.delete("/songs/:id", (req, res) => {
  db.Song.findByIdAndDelete({ _id: req.params.id })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

Router.delete("/users/:id", (req, res) => {
  db.User.findByIdAndDelete({ _id: req.params.id })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

// ===

module.exports = Router;
