const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("./models/user");
const authenticationController = require("./controllers/authenticationController");

// login
passport.use(new LocalStrategy(authenticationController.localStrategy));

passport.serializeUser(authenticationController.serializeUser);

passport.deserializeUser(authenticationController.deserializeUser);
