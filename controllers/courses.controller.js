const { validationResult } = require("express-validator");
const Corse = require("../models/course.modle");
const Status = require("../utils/Status");

const GetAllCourses = async (req, res) => {
  //pagenation
  const query = req.query;
  const limit = query.limit || 10; // default;
  const page = query.page || 1; // default;
  const skip = (page - 1) * limit;
  // control request to get all courses from the server.
  const courses = await Corse.find({}, { __v: false }).limit(limit).skip(skip);

  res.json({ status: Status.SUCCESS, data: { courses: courses } });
};

const GetCourse = async ( req, res) => {
  const course = await Corse.findById(req.params.id);
  if (!course) {
    
    return res.status(404).json({ status: Status.FAIL, data: { courses: "course not found" } });
  }
  res.json({ status: Status.SUCCESS, data: { course } });
};

const AddCourse = 
  async (req, res) => {
    console.log(req.body);
    const err = validationResult(req);
    if (!err.isEmpty()) {
      
      return res.status(400).json({ status: Status.FAIL, data: err.array() });
    }
    const newcourse = new Corse(req.body); // cearate course
    await newcourse.save(); //save the course and send it back as a response if saved successfully
  
    res.status(201).json({ status: Status.SUCCESS, data: { course: newcourse } });
  }


const UpdateCourse = async (req, res) => {
  const corseId = req.params.id;
  try {
    const updateCorse = await Corse.updateOne(
      { _id: corseId },
      {
        $set: { ...req.body },
      }
    );
    res
      .status(200)
      .json({ status: Status.SUCCESS, data: { course: updateCorse } });
  } catch (error) {
    res
      .status(500)
      .json({ status: Status.ERROR, msg: { courses: error.message } });
  }
};

const DeleteCourse = async (req, res) => {
  const corseId = req.params.id;
  const data = await Corse.deleteOne({ _id: corseId });
  res.json({ status: Status.SUCCESS, data: { data } });
};
module.exports = {
  GetAllCourses,
  GetCourse,
  AddCourse,
  UpdateCourse,
  DeleteCourse,
};
