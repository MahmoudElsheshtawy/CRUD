// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
const Corse = require("../models/course.modle");
// const { status } = require("express/lib/response");
const Status = require("../utils/Status");



const GetAllCourses = async (req, res) => {
  const courses = await Corse.find();

  res.json({ status : Status.SUCCESS , data: { courses: courses}});
};

const GetCourse = async (req, res) => {
try {
  const course = await Corse.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ status : Status.FAIL , data: { courses: 'course not found' } });
  }
  res.json({ status :Status.SUCCESS, data: { course}});
}catch(err){
  console.error(err.message);
  res.status(500).json({ status : Status.ERROR , msg: { courses: err.message}});
  
}
 
};

const AddCourse = async (req, res) => {
  console.log(req.body);
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ status : Status.FAIL , data: { errors: err.array()}});
  }
  const newcourse = new Corse(req.body); // cearate course
  await newcourse.save(); //save the course and send it back as a response if saved successfully

  res.status(201).json(newcourse);
};

const UpdateCourse = async (req, res) => {
  const corseId = req.params.id;
  const updateCorse = await Corse.updateOne(
    { _id: corseId },
    {
      $set: { ...req.body },
    }
  );
  res.status(200).json(updateCorse);
};

const DeleteCourse = async (req, res) => {
  const corseId = req.params.id;
  const data = await Corse.deleteOne({ _id: corseId });
  res.json({ status :Status.SUCCESS, data: {data}});
};
module.exports = {
  GetAllCourses,
  GetCourse,
  AddCourse,
  UpdateCourse,
  DeleteCourse,
};
