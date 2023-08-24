const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const routesController = require("../controllers/routesController");

const signupValidate = [body("first_name").trim().notEmpty()];
/* GET home page. */
router.get("/", routesController.home_get);

router.get("/signup", signupValidate, routesController.signup_get);

router.post("/signup", routesController.signup_post);

router.get("/login", routesController.login_get);

router.post("/login", routesController.login_post);

module.exports = router;
