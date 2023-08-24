const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.home_get = (req, res) => {
  res.render("index", { title: "Express", user: req.user });
};

exports.signup_post = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      try {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          date_of_birth: req.body.date_of_birth,
          password: hash,
        });

        const result = await user.save();
        res.redirect("/login");
      } catch (error) {
        return next(err);
      }
    });
  }
  res.send(result);
};

exports.signup_get = (req, res) => {
  res.render("sign_up");
};

exports.login_post = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
});

exports.login_get = (req, res) => {
  res.render("log_in");
};
