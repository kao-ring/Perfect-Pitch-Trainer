const Router = require("express").Router();
const passport = require("../authentication/passport");
const apiRoutes = require("./apiRoutes");
const authRoutes = require("../authentication/authRoutes");

Router.use("/api", passport.authenticate('jwt', {session: false}), apiRoutes);
Router.use("/auth", authRoutes);

module.exports = Router;