const express = require("express");

const router = express.Router();
const usercontroller =require("../controllers/users.controller");
const verifiyToken = require("../middlewares/verifiyToken");

const multer  = require('multer');
const appError = require("../utils/appError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file: " ,file)

    cb(null,'uploads')
  },
  filename: function (req, file, cb) {
    const ext =file.mimetype.split("/")[1];
    const fileName =`user-${Date.now()}.${ext}`; 
    cb(null, fileName)
  }
})
const fileFilter= (req, file, cb)=>{
    const imgeType =file.mimetype.split('/')[0];
    // console.log("file: " , file)
    // console.log("file type: " , imgeType)
    if(imgeType === 'image'){
      return cb(null, true);
    }else{
      return cb(appError.create("the file mast be img",400), false)
    }
}
const upload = multer(
  { storage: storage ,
  fileFilter
})



router.route("/")
  .get(verifiyToken,usercontroller.GetAllusers)
  
  
router.route("/register")
  .post(upload.single('avatar'),usercontroller.Register)

router.route("/login")
  .post(usercontroller.Login)

module.exports = router;

