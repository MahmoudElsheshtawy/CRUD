const express = require("express");

const router = express.Router();
const usercontroller =require("../controllers/users.controller");
const verifiyToken = require("../middlewares/verifiyToken");
//get all users
//register
//login

router.route("/")
  .get(verifiyToken,usercontroller.GetAllusers)
  
  
router.route("/register")
  .post(usercontroller.Register)

router.route("/login")
  .post(usercontroller.Login)

module.exports = router;

