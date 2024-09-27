// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
const Corse = require("../models/course.modle");

const GetAllCourses = async (req, res) => {
  const courses = await Corse.find();

  res.json(courses);
};

const GetCourse = async (req, res) => {
  const course = await Corse.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not====== found");
  }
  res.json(course);
};

const AddCourse = async (req, res) => {
  console.log(req.body);
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
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

  res.json({ success: true, msg: data });
};
module.exports = {
  GetAllCourses,
  GetCourse,
  AddCourse,
  UpdateCourse,
  DeleteCourse,
};
