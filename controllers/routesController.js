const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

exports.home_get = (req, res, next) => {
  res.render("index", { title: "Express", user: req.user });
};

exports.signup_post = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      date_of_birth: req.body.date_of_birth,
      password: hash,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  });
};

exports.signup_get = (req, res, next) => {
  res.render("sign_up");
};

exports.login_post = passport.authenticate(
  "local",
  { failureRedirect: "/login", successRedirect: "/" },
);

exports.login_get = (req, res, next) => {
  res.render("log_in");
};
