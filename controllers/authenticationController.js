const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.localStrategy = async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return done(null, false, { message: "Incorrect email" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

exports.serializeUser = (user, done) => {
  done(null, user.id);
};

exports.deserializeUser = (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
};
