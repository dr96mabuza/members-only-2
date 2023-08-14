const LocalStrategy =  require("passport-local").Strategy;
const User = require("./models/user");
const passport = require("passport");
const authenticationController = require("./controllers/authenticationController");

// login
passport.use(new LocalStrategy(authenticationController.localStrategy));
  
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});