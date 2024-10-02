const express = require("express");

const router = express.Router();
const usercontroller =require("../controllers/users.controller")
//get all users
//register
//login

router.route("/")
  .get(usercontroller.GetAllusers)
  
  
router.route("/register")
  .post(usercontroller.Register)

router.route("/login")
  .post(usercontroller.Login)

module.exports = router;
