var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy =  require("passport-local");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/signup', function (req, res, next) {
  res.render('sign_up');
});

router.get('/login', (req, res, next) => {
  res.render('log_in');
});

router.post('/signup', (req, res,next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      date_of_birth: req.body.date_of_birth,
      password: hash
    }).save(err => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  });
});

// login
passport.use(
  new LocalStrategy(async(email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
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

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.use(passport.initialize());

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

module.exports = router;
