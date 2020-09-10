const Router = require("express").Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const userController = require("../controllers/userController")

/* POST login. */
Router.post('/login', function (req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log("user info", user);
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user.toJSON(), 'superSecret');
           const { email } = user;
           return res.json({email, token});
        });
    })(req, res);
});

Router.post("/register", userController.createNew)

module.exports = Router;