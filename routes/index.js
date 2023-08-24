const express = require("express");

const router = express.Router();
const routesController = require("../controllers/routesController");

/* GET home page. */
router.get("/", routesController.home_get);

router.get("/signup", routesController.signup_get);

router.post("/signup", routesController.signup_post);

router.get("/login", routesController.login_get);

router.post("/login", routesController.login_post);

module.exports = router;
