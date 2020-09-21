const db = require("../models");

module.exports = {
  createNew: async (req, res) => {
    const { user_name, password } = req.body;
    db.User.create({
      user_name: user_name,
      password: password,
    })
      .then((res) => {
        return res.json(res);
      })
      .catch((err) => {
        return alert(err);
      });
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
