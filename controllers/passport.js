const LocalStrategy =  require("passport-local").Strategy;
const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// login
passport.use(
    new LocalStrategy(async(email, password, done) => {
      try {
        const user = await User.findOne({ email: email }).exec();
        console.log(user)
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        };
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });