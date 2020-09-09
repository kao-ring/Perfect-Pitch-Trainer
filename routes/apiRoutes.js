const router = require("express").Router();
const db = require("../models");
const authRoutes = require("./authentication/authRoutes.js");

router.get("/recipes", (req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  db.Recipe.find({
    title: { $regex: new RegExp(req.query.q, "i") },
  })
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(422).end());
});

router.get("login", (req, res) => {
  res.send("You are logged in.");
});

router.route("/users").post(userController.createNew);

module.exports = router;
