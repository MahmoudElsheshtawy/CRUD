const { TokenExpiredError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require('validator');
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
 
  }
});
module.exports = mongoose.model("User", userSchema);
