const db = require("../models");

module.exports = {
  createNew: async (req, res) => {
    const { user_name, password } = req.body;

    const newUser = await db.User.create({
      user_name: user_name,
      password: password,
    });
    res.json(newUser);
  },

  addTest: async (req, res) => {
    const addTest = await db.User.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $push: { tests: { title: req.body.title, score: req.body.score } },
      }
    );
    res.json(addTest);
  },
};
