



module.exports = {
    findAll: function(req, res) {
      db.Book
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },