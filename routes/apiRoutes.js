const router = require("express").Router();
const db = require("../models");
const authRoutes = require("./authentication/authRoutes.js");

router.get("/songs", (req, res) => {
  db.Song.findAll();
});

router.get("login", (req, res) => {
  res.send("You are logged in.");
});

router.route("/users").post(userController.createNew);

module.exports = router;
