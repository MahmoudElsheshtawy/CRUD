const express = require("express");

const router = express.Router();
const usercontroller =require("../controllers/users.controller");
const verifiyToken = require("../middlewares/verifiyToken");

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file: " ,file)

    cb(null,'uploads')
  },
  filename: function (req, file, cb) {
    const ext =file.mimetype.split("/")[1]
    const fileName =`user-${Date.now()}.${ext}`; 
    cb(null, fileName)
  }
})
const upload = multer({ storage: storage })


router.route("/")
  .get(verifiyToken,usercontroller.GetAllusers)
  
  
router.route("/register")
  .post(upload.single('avatar'),usercontroller.Register)

router.route("/login")
  .post(usercontroller.Login)

module.exports = router;

