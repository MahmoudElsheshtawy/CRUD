
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");
const Status = require("../utils/Status");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generate.JWT");
require("dotenv").config();

const GetAllusers = asyncWrapper(async (req, res) => {
 
  // console.log(req.header);
  
  //pagenation
  const query = req.query;
  const limit = query.limit || 10; // default;
  const page = query.page || 1; // default;
  const skip = (page - 1) * limit;
  // control request to get all courses from the server.
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);



  res.json({ status: Status.SUCCESS, data: { users } });
});

const Register = asyncWrapper(async (req, res, next) => {
  // console.log(req.body);

  // password haching

  const { fristName, lastName, email, password,role } = req.body;
  const oldUser = await User.findOne({ email: email});

  if(oldUser) {
      const error = appError.create('user already exists', 400, Status.FAIL)
      return next(error);
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newuser = new User({
    fristName,
    lastName,
    email,
    password: hashPassword,
    role,
  });

const token = await generateJWT({email: newuser.email, id : newuser._id,role: newuser.role})
  newuser.token = token;

  await newuser.save();
  res.status(201).json({ status: Status.SUCCESS, data: { user: newuser } });
});

const Login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    const error = appError.create("email and pass", 400, Status.FAIL);
    return next(error); 
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.create("user not founeeeed", 400, Status.FAIL);
    return next(error);
  }
  const matchpassword = await bcrypt.compare(password, user.password);

  if (user && matchpassword) {
    const token = await generateJWT({email: user.email, id : user._id,role: user.role})
  // newuser.token = token;
    return res.json({
      status: Status.SUCCESS,
      data: { token },
    });
  } else {
    const error = appError.create('something wrong', 500, Status.ERROR)
        return next(error);
   
  }
});



module.exports = {
  GetAllusers,
  Register,
  Login,
};
