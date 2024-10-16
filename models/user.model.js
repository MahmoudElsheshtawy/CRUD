const { TokenExpiredError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require('validator');
const userroles = require("../utils/user.rolse");
const userSchema = new mongoose.Schema({
  fristName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email "],
  },
  
  password: {
    type: String,
    required: true,
   
  },
  token:{
    type: String,
 
  },
  role:{
    type: String,
   enum:[ userroles.ADMIN, userroles.MANGER, userroles.USER],
    default: userroles.USER,
  }
  ,
  avatar:{
    type: String,
    // default: 'default.jpg',
    // validate: [validator.isURL, "Invalid URL"],
  }
  
});
module.exports = mongoose.model("User", userSchema);
